'use strict'

const Model = use('Model')

class Group extends Model {

    users() {

        return this.belongsToMany('App/Models/User')
    
    }

    messages() {

        return this.hasMany('App/Models/Message', '_id', 'group_chat')
    
    }

}

module.exports = Group
