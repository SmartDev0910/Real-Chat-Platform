'use strict'

class RegisterUser {
  
  get rules () {
    
    return {
      email: 'required|email|unique:users,email',
      password: 'required|min:6|confirmed',
      username: 'required|max:20|unique:users,username'
    }

  }

  async fails (errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }

}

module.exports = RegisterUser
