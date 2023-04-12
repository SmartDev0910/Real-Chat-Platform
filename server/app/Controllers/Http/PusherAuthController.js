'use strict'
const Pusher = require('pusher')
const Env = use('Env')

const pusher = new Pusher({
  appId: Env.get('PUSHER_APP_ID', ''),
  key: Env.get('PUSHER_APP_KEY', ''),
  secret: Env.get('PUSHER_SECRET_KEY', ''),
  cluster: 'eu',
  encrypted: true,
})

class PusherAuthController {

    async auth({ auth, request }) {

        const { socket_id, channel_name } = request.all()

        const user = await auth.getUser()

        const channelData = {
          user_id: user._id,
          user_info: {
            username: user.username,
          }
        }

        return pusher.authenticate(socket_id, channel_name, channelData)

    }

}

module.exports = PusherAuthController
