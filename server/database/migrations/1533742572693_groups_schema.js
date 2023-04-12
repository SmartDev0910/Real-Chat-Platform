'use strict'

const Schema = use('Schema')

class GroupsSchema extends Schema {
  up () {
    this.create('groups', (collection) => {

      collection.index('name', {name: 1})
      collection.index('avatar', {avatar: 1})
      collection.index('user_id', {user_id: 1})
      
    })
  }

  down () {
    this.drop('groups')
  }
}

module.exports = GroupsSchema
