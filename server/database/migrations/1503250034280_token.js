'use strict'

const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (collection) => {

      collection.index('user_id', {user_id: 1})
      collection.index('token', {token: 1}, {unique: true})
      collection.index('type', {type: 1})
      collection.index('is_revoked', {is_revoked: 1})
      
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
