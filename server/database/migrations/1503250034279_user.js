'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (collection) => {
      
      collection.index('email', {email: 1}, {unique: true})
      collection.index('username', {username: 1}, {unique: true})
      collection.index('password', {password: 1})
      collection.index('description', {description: 1})
      collection.index('avatar', {avatar: 1})

    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
