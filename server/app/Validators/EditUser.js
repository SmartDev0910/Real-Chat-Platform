'use strict'

class EditUser {
  get rules () {

    return {
      username: 'required|max:20|min:3'
    }

  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }

}

module.exports = EditUser
