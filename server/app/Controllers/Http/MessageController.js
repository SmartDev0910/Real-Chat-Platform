'use strict'
const Message = use('App/Models/Message')
const ObjectId = use('mongodb').ObjectID;
const Event = use('Event')

class MessageController {

    async messages ({ params: { room_name, chat_id } }) {
        
        const messages = await Message.query().where({
          [room_name]: ObjectId(chat_id)
        }).with('user').sort('-created_at').limit(2).fetch();
        
        return { messages }

    }

    async send({ auth, request }) {

        const { roomName, chatId, body } = request.all()
        const user = await auth.getUser()

        const message = await Message.create({ 
            body,
            user_id: user._id,
            [roomName]: ObjectId(chatId),
        })

        message.user = user;

        await Event.fire('message', {
            message,
            room: `${roomName}${chatId}`
        })

    }

}

module.exports = MessageController
