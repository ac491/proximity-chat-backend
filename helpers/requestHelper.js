const Request = require('../models/RequestSchema');
const FriendList = require('../models/FriendListSchema');

module.exports = {
    async createRequest(firstUserRequestObj, secondUserRequestObj) {
        try {

            // request sent from one user
            const firstRequest = new Request(firstUserRequestObj);
            await firstRequest.save();

            // request received by another user
            const secondRequest = new Request(secondUserRequestObj);
            await secondRequest.save();

        } catch(err) {
            throw err;
        }
    },

    async listRequests(user_id) {
        try {

            let requests = await Request.find({'owner_email':user_id})
            return requests;

        } catch(err) {
            throw err;
        }
    },

    async addFriend(firstUserRequestObj, secondUserRequestObj) {
        try {

            let friendListUser1 = await FriendList.find({'email_address':firstUserRequestObj.email_address});
            
            if (friendListUser1.length > 0) {
                friendListUser1[0].friendlist.push(secondUserRequestObj);
                await friendListUser1[0].save();
            } else {
                const friendList1 = new FriendList({email_address: firstUserRequestObj.email_address, friendlist: [secondUserRequestObj]});
                await friendList1.save();
            }

            let friendListUser2 = await FriendList.find({'email_address':secondUserRequestObj.email_address});
            if (friendListUser2.length > 0) {
                friendListUser2[0].friendlist.push(firstUserRequestObj);
                await friendListUser2[0].save();
            } else {
                const friendList2 = new FriendList({email_address: secondUserRequestObj.email_address, friendlist: [firstUserRequestObj]});
                await friendList2.save();
            }

            let requests = await Request.find(
                {$or:[
                    {$and: [{'owner_email':firstUserRequestObj.email_address},{'email_address':secondUserRequestObj.email_address}]},
                    {$and: [{'owner_email':secondUserRequestObj.email_address},{'email_address':firstUserRequestObj.email_address}]}
                ]}
                );
            for(const request of requests){
                request.isMatched = true;
                await request.save();
            };

        } catch(err) {
            throw err;
        }
    },

    async listFriends(email_address) {
        try {

            let friends = await FriendList.find({'email_address':email_address});
            if(friends.length>0) {
                return friends[0].friendlist;
            } else {
                return [];
            }
            

        } catch(err) {
            throw err;
        }
    },
}