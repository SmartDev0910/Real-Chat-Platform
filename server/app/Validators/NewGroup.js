'use strict'

class NewGroup {

  get rules () {
    
    return {
      name: 'required|min:3|max:20',
      usersId: 'array',
    }

  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }

}

module.exports = NewGroup
