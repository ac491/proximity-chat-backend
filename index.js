const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const initRoutes = require('./routes/routes');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./configs/dbConfig');
const Location = require('./models/GeoLocationSchema');
const Message = require('./models/MessageSchema');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

initRoutes(app);

sockets = {};

io.on('connection', function(socket) {
    console.log('A user connected');
    console.log(typeof socket.id)

    //Add the socket to dictionary
    sockets[socket.id] = socket;

    socket.on('login', ({user_name, email_address, latitude, longitude, dist}) => {
        const location = new Location({
            user_name: user_name,
            email_address: email_address,
            user_id: socket.id,
            location: {
                "type": "Point",
                "coordinates": [
                    longitude,
                    latitude
                ]
            }
        });
        location.save().then( () => {
            console.log('User entry created')

            Location.find({
                "location": {
                  $near: {
                    $geometry: {
                       type: "Point" ,
                       coordinates: [longitude , latitude],
                    },
                    $maxDistance: dist
                  }
                },
                "user_id": { $ne: socket.id } 
             }).then (location => {
                console.log(location);
                if(location.length > 0) {
                    let loc = location[0];
                    io.to(loc.user_id).emit('match', {'matched_with':user_name, matched_with_email:email_address, room_id: loc.user_id + socket.id});
                    io.to(socket.id).emit('match', {'matched_with':loc.user_name, matched_with_email:loc.email_address, room_id: loc.user_id + socket.id});

                    //add the users to rooms
                    socket.join(loc.user_id + socket.id);
                    sockets[loc.user_id].join(loc.user_id + socket.id);

                    Location.deleteMany( { user_id : { $in: [
                      socket.id, loc.user_id 
                    ] } } ).then(() => {
                        console.log('Users matched and deleted')
                    }).catch((err)=>{
                        console.log(err)
                    });
                }
             })
        }).catch(err => {
            console.log(err);
        });
    })

    socket.on('add_to_room', (room) => {
        console.log('User joined the persistent chat room');
        socket.join(room);
    })

    socket.on('chat', ({data, room}) => {
        data['room'] = room;
        const message = new Message(data);
        console.log('Message data object -----', data)
        message.save().then(()=>{
            console.log('Message successfully saved!')
            Message.find({"room": room}).then(messages => {
                console.log('All message')
                socket.broadcast.to(room).emit('chat', messages);
            })
        }).catch(err=> {
            console.log(err);
        })
    })

    socket.on('unmatch', (room) => {
        socket.broadcast.to(room).emit('leave-room', room);
        Message.deleteMany( {"room": room} ).then(() => {
              console.log('Deleted all matched messages')
          }).catch((err)=>{
              console.log(err)
          });
        socket.leave(room);
    })
    


    socket.on('disconnect', function () {
       console.log('A user disconnected');
       sockets[socket.id] = null;
    });
 });

http.listen(process.env.PORT, () => {
  console.log(`Running at localhost:${process.env.PORT}`);
});