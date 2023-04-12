'use strict'

const Schema = use('Schema')

class FriendshipSchema extends Schema {
  up () {
    this.create('friendships', (collection) => {

      collection.index('requester', {requester: 1})
      collection.index('requested', {requested: 1})
      collection.index('status', {status: 1})

    })
  }

  down () {
    this.drop('friendships')
  }
}

module.exports = FriendshipSchema
