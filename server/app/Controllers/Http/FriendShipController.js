'use strict'

const User = use('App/Models/User')

class FriendShipController {

    async add({ auth, params: { recipientId } }) {

        const currentUser = await auth.getUser()

        const status = await User.addFriend(recipientId, currentUser._id);

        return { status }

    }

    async accept({ auth, params: { senderId } }) {

        const currentUser = await auth.getUser()

        const status = await User.acceptFriend(senderId, currentUser._id);

        return { status }

    }

    async reject({ auth, params: { userId } }) {

        const currentUser = await auth.getUser()

        const status = await User.rejectFriendship(userId, currentUser._id);

        return { status }

    }

    async check({ auth, params: { userId } }) {

        const currentUser = await auth.getUser()

        const status = await User.checkFriendship(userId, currentUser._id)

        return { status }

    }

    async userForChat({ user }) {

        return { user }

    }
    

}

module.exports = FriendShipController
