'use strict'

const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (collection) => {
      
      collection.index('user_id', {user_id: 1})
      collection.index('group_chat', {group_chat: 1})
      collection.index('friend_chat', {friend_chat: 1})
      collection.index('body', {body: 1})
      collection.index('photo', {photo: 1})


    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
