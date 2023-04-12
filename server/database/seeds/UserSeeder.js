'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class UserSeeder {
  async run () {
    
    // .................................................................

    const ismael = await Factory.model('App/Models/User').create({
      email: 'Arcoders@gmail.com',
      username: 'Ismael Haytam',
      withoutAvatar: true,
    })

    const marta = await Factory.model('App/Models/User').create({
      email: 'Marta@gmail.com',
      username: 'Marta Lopez',
      withoutAvatar: true,
    })

    const victor = await Factory.model('App/Models/User').create({
      email: 'Victor@gmail.com',
      username: 'Victor Crack',
      withoutAvatar: true,
    })

    
    await Factory.model('App/Models/Friendship').create({
      requester: marta._id,
      requested: ismael._id,
      status: 0
    })

    await Factory.model('App/Models/Friendship').create({
      requester: ismael._id,
      requested: victor._id,
      status: 0
    })

    await Factory.model('App/Models/Friendship').create({
      requester: victor._id,
      requested: marta._id,
      status: 0
    })

    // ..................................................................

    const users = await Factory.model('App/Models/User').createMany(15)

    for (const user of users) {

      const group = await Factory.model('App/Models/Group').create({
        user_id: user._id
      })

      await group.users().attach([user._id, ismael._id])

      const friendship = await Factory.model('App/Models/Friendship').create({
        requester: ismael._id,
        requested: user._id,
        status: 1
      })

      
      await Factory.model('App/Models/Message').createMany(5, {
        user_id: (Math.random() > 0.5) ? ismael._id : user._id,
        friend_chat: friendship._id,
      })
      
    }

    // ....................................................................

    const arcoders = await Factory.model('App/Models/Group').create({
      name: 'Arcoders',
      user_id: ismael._id,
      avatar: null
    })

    await arcoders.users().attach([ismael._id, marta._id])

    await Factory.model('App/Models/Message').create({
      user_id: ismael._id,
      group_chat: arcoders._id
    })

    const fustal = await Factory.model('App/Models/Group').create({
      name: 'Fustal Girona',
      user_id: ismael._id,
      avatar: null
    })

    await fustal.users().attach([ismael._id, marta._id, victor._id])

    const javascript = await Factory.model('App/Models/Group').create({
      name: 'Javascript',
      user_id: ismael._id,
      avatar: null
    })

    await javascript.users().attach([ismael._id, marta._id, victor._id])

    const tecno = await Factory.model('App/Models/Group').create({
      name: 'Tecnología',
      user_id: marta._id,
      avatar: null
    })

    await tecno.users().attach([marta._id, ismael._id])

  }
}

module.exports = UserSeeder
