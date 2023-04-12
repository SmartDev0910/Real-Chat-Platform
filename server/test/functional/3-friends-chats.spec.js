'use strict'

const { test, trait } = use('Test/Suite')('List Of Chats')

const Factory = use('Factory')
const ObjectId = use('mongodb').ObjectID;

trait('Test/ApiClient')
trait('Auth/Client')


test('get private chat with the last message of the conversation', async ({ client }) => {

  const ismael = await Factory.model('App/Models/User').create({ username: 'Ismael Haytam' })
  const victor = await Factory.model('App/Models/User').create({ username: 'Victor Crack' })

  // Create Friendship

  const chat = await Factory.model('App/Models/Friendship').create({
    requester: ismael._id,
    requested: victor._id,
    status: 1
  })

  await Factory.model('App/Models/Message').create({
    user_id: ismael._id,
    friend_chat: chat._id
  })

  const message = await Factory.model('App/Models/Message').create({
    user_id: victor._id,
    friend_chat: chat._id
  })
  
  // Login as Ismael and get chats


  const ismaelChats = await client.get('api/chats').loginVia(ismael).end()

  ismaelChats.assertStatus(200)

  ismaelChats.assertJSONSubset({
    friends: [
      {
        requested: ObjectId(victor._id).toString(),
        user: {
          _id: ObjectId(victor._id).toString(),
          email: victor.email,
          username: victor.username
        },
        message: {
          body: message.body,
          friend_chat: ObjectId(chat._id).toString(),
          user_id: ObjectId(victor._id).toString()
        }
      }
    ],
    friendsId: [ObjectId(chat._id).toString()]
  })

}).timeout(0)



test('verify that there is no conversation between users', async ({ client }) => {

  const marta = await Factory.model('App/Models/User').create({ username: 'Marta Lopez' })
  const fatima = await Factory.model('App/Models/User').create({ username: 'Fatima Chadli' })

  // Create Friendship

  const chat = await Factory.model('App/Models/Friendship').create({
    requester: marta._id,
    requested: fatima._id,
    status: 1
  })
  
  // Login as Fatima and get chats

  const fatimaChats = await client.get('api/chats').loginVia(fatima).end()

  fatimaChats.assertStatus(200)

  fatimaChats.assertJSONSubset({
    friends: [
      {
        requester: ObjectId(marta._id).toString(),
        user: {
          _id: ObjectId(marta._id).toString(),
          email: marta.email,
          username: marta.username
        },
        message: null
      }
    ],
    friendsId: [ObjectId(chat._id).toString()]
  })

}).timeout(0)
