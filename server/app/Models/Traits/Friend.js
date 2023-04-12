'use strict'
const ObjectId = use('mongodb').ObjectID;
const Friendship = use('App/Models/Friendship')
const renameKeys = use('rename-keys');
const Event = use('Event')

class Friend {
  register (Model, customOptions = {}) {

    const defaultOptions = {}

    const options = Object.assign(defaultOptions, customOptions)


    Model.addFriend = async (recipientId, currentUserId) => {

      let status = await Model.checkFriendship(recipientId, currentUserId)
      
      if (status === 'not_friends') {
        
        await Friendship.create({ requester: currentUserId, requested: ObjectId(recipientId), status: 0 })

        await Event.fire('requestSent', { userId: recipientId, currentUserId })


        return 'waiting'

      }

      return status

    }


    Model.acceptFriend = async (senderId, currentUserId) => {
      
      const status = await Model.checkFriendship(senderId, currentUserId)

      if (status === 'pending') {

        await Friendship.query().betweenUsers(ObjectId(senderId), currentUserId).update({ status: 1 })

        await Event.fire('updateFriendshipStatus', { userId: senderId, currentUserId })

        return 'friends'

      }

      return status

    }


    Model.rejectFriendship = async (userId, currentUserId) => {

      const status = await Model.checkFriendship(userId, currentUserId)

      if (status !== 'not_friends') {

        await Friendship.query().betweenUsers(ObjectId(userId), currentUserId).delete()

        await Event.fire('updateFriendshipStatus', { userId, currentUserId })


        return 'not_friends'

      }

      return status

    }


    Model.checkFriendship = async (userId, currentUserId) => {

      if (currentUserId.equals(userId)) return 'same_user'
      
      const friendship = await Friendship.query().betweenUsers(ObjectId(userId), currentUserId).first()

      if (!friendship) return 'not_friends'

      if (friendship['status'] === 1) return 'friends'

      if (friendship['requester'].equals(currentUserId)) return 'waiting'

      if (friendship['requested'].equals(currentUserId)) return 'pending'

    }


    Model.areFriends = async (userId, currentUserId) => {

      return await Model.checkFriendship(userId, currentUserId) === 'friends'
      
    }


    Model.chats = async (currentUserId) => {
   
      const rooms = (await Friendship.query().rooms(currentUserId).fetch()).toJSON()

      let result = []

      for (let room of rooms)  result.push(this.changeKeys(this.removeSameUser(room, currentUserId)))

      return result

    }


    Model.chatsId = async (currentUserId) => {

      return (

        await Friendship.query().whereSender(currentUserId).accepted().pluck('_id')
     
      ).concat(

        await Friendship.query().whereRecipient(currentUserId).accepted().pluck('_id')
      
      )

    }


    Model.friends = async (currentUserId, ids = null) => {

      const rooms = (await Friendship.query().rooms(currentUserId).fetch()).toJSON()

      let result = []

      for (let room of rooms) result.push(this.changeKeys(this.removeSameUser(room, currentUserId)).user)

      if (ids === 'justIds') return result.map(user => user._id)

      return result

    }


  }

  changeKeys(obj) {

    return renameKeys(obj, key => (key === 'sender' || key === 'recipient') ? 'user' : key)

  }

  removeSameUser(obj, authId) {

    (ObjectId(obj.sender._id).equals(authId)) ? delete obj.sender: delete obj.recipient

    return obj

  }


}

module.exports = Friend
