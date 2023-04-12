'use strict'

const User = use('App/Models/User')

class IsFriend {
  async handle ({ auth, params, response }, next) {

    const currentUser = await auth.getUser()

    const arFriends = await User.areFriends(params.user, currentUser._id)

    if (!arFriends) response.status(403).send({ error: 'Access denied' })

    await next()

  }
}

module.exports = IsFriend
