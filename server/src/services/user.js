const mongoose = require('mongoose');
const UserModel = require('../../models/user.model');
const userSchema = require('../../schemas/user.schemas');
const ConversationClass = require('../services/conversation');

class UserClass {
    constructor(){
        /**
         * @type {mongoose.Model<any>}
         */
        this.User = new mongoose.model("User", userSchema);
        this.Conversation = new ConversationClass();
    }

     /**
     * @param {UserModel} newUser
     */
    async createUser(newUser) {
        return await this.User.create(newUser);
    }

    async getAllUser() {
        return await this.User.find();
    }

    async getUserByEmail(email) {
        return await this.User.findOne({email: email});
    }

    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {Boolean} status 
     */
    async updateProfile(id, email, displayname , avatar , status)
    {
        return await this.User.findOneAndUpdate({_id: id}, {
            email: email,
            displayname: displayname,
            avatar: avatar,
            status:status
        });
    }

    async chat(id, receiverId, newConSend, newConRec){
        await this.User.findOneAndUpdate(
            {_id: id}, {
                $push: {
                    conversations: [newConSend]
                }
            });
        await this.User.findOneAndUpdate(
            {_id: receiverId}, {
                $push: {
                    conversations: [newConRec]
                }
            });
        return 'You two are chatting'
    }

    async getId(id) {
        return await this.User.findOne({ _id: id });
    }

    async deleteUser(id) {
        await this.User.findOneAndDelete({ _id: id });
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */
    async addFriend(id, friendId) {
        // Optional. Use this if you create a lot of connections and don't want
        // to copy/paste `{ useNewUrlParser: true }`.
        mongoose.set('useNewUrlParser', true);
        let user = await this.getId(id);
        for (let i = 0; i < user.friendList.length; i++) {
            if (friendId == user.friendList[i]) {
                return 'Already be friend';
            }
        }
        // user.friendList.push(friendId);
        await this.User.updateOne({ _id: id }, { $push: { friendListRequest: [friendId] } });
        return 'Friends'
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */
    async DeleteFriend(id, friendId) {
        // Optional. Use this if you create a lot of connections and don't want
        // to copy/paste `{ useNewUrlParser: true }`.
        mongoose.set('useNewUrlParser', true);
        await this.User.updateOne({ _id: id }, { $pull: { friendList: { $in: [friendId] } } });
        return 'Deleted'
    }
    
    async LoginWithEmail(newUser) {
        return await this.User.create(newUser);
    }
}

module.exports = UserClass;