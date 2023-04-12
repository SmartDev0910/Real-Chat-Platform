'use strict'

const { test, trait } = use('Test/Suite')('Groups Chats')

const Factory = use('Factory')
const ObjectId = use('mongodb').ObjectID;

trait('Test/ApiClient')
trait('Auth/Client')


test('get chat groups with the last message of the conversation', async ({ client }) => {

  const berto = await Factory.model('App/Models/User').create({ username: 'Berto Romero' })
  const david = await Factory.model('App/Models/User').create({ username: 'David Alva' })

  // Group 1

  const react = (await Factory.model('App/Models/Group').create({
    name: 'React',
    user_id: berto._id
  }))

  await react.users().attach([berto._id, david._id])

  await Factory.model('App/Models/Message').create({
    user_id: berto._id,
    group_chat: react._id
  })

  const react_message = await Factory.model('App/Models/Message').create({
    user_id: david._id,
    group_chat: react._id
  })

  // Group 2

  const angular = await Factory.model('App/Models/Group').create({
    name: 'Angular',
    user_id: berto._id
  })

  await angular.users().attach([berto._id])

  const angular_message = await Factory.model('App/Models/Message').create({
    user_id: berto._id,
    group_chat: angular._id
  })

  // Login as Berto and get groups


  const bertoGroups = await client.get('api/chats').loginVia(berto).end()

  bertoGroups.assertStatus(200)

  bertoGroups.assertJSONSubset({
    groups: [
      {
        name: react.name,
        user_id: ObjectId(react.user_id).toString(),
        message: {
          body: react_message.body,
          group_chat: ObjectId(react._id).toString(),
          user_id: ObjectId(david._id).toString()
        }
      },
      {
        name: angular.name,
        user_id: ObjectId(angular.user_id).toString(),
        message: {
          body: angular_message.body,
          group_chat: ObjectId(angular._id).toString(),
          user_id: ObjectId(berto._id).toString()
        }
      }
    ],
    groupsId: [ObjectId(react._id).toString(), ObjectId(angular._id).toString()]
  })


}).timeout(0)

test('verify that the group does not contain messages', async ({ client }) => {

  const anna = await Factory.model('App/Models/User').create({ username: 'Anna Doler' })

  // Group 1

  const vue = await Factory.model('App/Models/Group').create({
    name: 'Vue',
    user_id: anna._id
  })

  
  await vue.users().attach([anna._id])

  // Login as Anna and get groups

  const annaGroups = await client.get('api/chats').loginVia(anna).end()

  annaGroups.assertStatus(200)

  annaGroups.assertJSONSubset({
    groups: [
      {
        name: vue.name,
        user_id: ObjectId(vue.user_id).toString(),
        message: null
      }
    ],
    groupsId: [ObjectId(vue._id).toString()]
  })

}).timeout(0)