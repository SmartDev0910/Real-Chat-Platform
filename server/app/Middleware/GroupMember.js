'use strict'

class GroupMember {
  async handle ({ params, auth, response }, next) {

    const currentUser = await auth.getUser()

    const groups = ((await currentUser.groups().fetch()).toJSON()).map(obj => obj._id)

    if (!groups.includes(params.group)) response.status(403).send({ error: 'Access denied' })

    await next()

  }
}

module.exports = GroupMember
