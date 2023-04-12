const Event = use('Event')
const Pusher = require('pusher')
const Env = use('Env')

const pusher = new Pusher({
  appId: Env.get('PUSHER_APP_ID', ''),
  key: Env.get('PUSHER_APP_KEY', ''),
  secret: Env.get('PUSHER_SECRET_KEY', ''),
  cluster: 'eu',
  encrypted: true,
})

Event.on('group', async (userId) => {
  pusher.trigger(`user${userId}`, 'refreshList', { type: 'group' })
})

Event.on('updateFriendshipStatus', async (data) => {
  const channels = [`user${data.userId}`, `user${data.currentUserId}`]
  pusher.trigger(channels, 'friendship', [])
  pusher.trigger(channels, 'refreshList', { type: 'private' })
})

Event.on('requestSent', async (data) => {
  pusher.trigger([`user${data.userId}`, `user${data.currentUserId}`], 'friendship', [])
})

Event.on('message', async (data) => {
  pusher.trigger(`presence-${data.room}`, 'newMessage', data.message)
  pusher.trigger(`${data.room}`, 'updatePreviewMessage', data.message)
})
