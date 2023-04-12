'use strict'

const User = use('App/Models/User')
const Friendship = use('App/Models/Friendship')
const Group = use('App/Models/Group')

class ChatController {

    async chats ({ auth }) {

        const user = await auth.getUser()

        return { 

            friends: await this.withLastMessage(await User.chats(user._id), Friendship),

            friendsId: await User.chatsId(user._id),

            groups: await this.withLastMessage((await user.groups().fetch()).toJSON(), Group),

            groupsId: ((await user.groups().fetch()).toJSON()).map(obj => obj._id)
            
        }

    }


    async withLastMessage(chats, Model) {

        let result = []

        for (const i of Object.keys(chats)) {
        
            const msg = await (await Model.find(chats[i]._id)).messages().orderBy('_id', 'desc').first()

            result.push({ ...chats[i], ...{message: msg} })

        }

        return result

    }

}

module.exports = ChatController
