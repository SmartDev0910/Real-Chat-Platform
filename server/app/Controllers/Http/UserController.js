'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator')

class UserController {

    async register({ request }) {

        const { email, password, username } = request.all();

        await User.create({email, password, username})

        return this.login(...arguments)

    }

    async login ({ request, auth }) {

        const { email, password } = request.all()

        const token = await auth.attempt(email, password)
        
        if (token) token.user = await User.query().where('email', email).first();
        
        return token

    }

    async users ({ auth }) {

        const user = await auth.getUser()
        
        const friends = await User.friends(user._id, 'justIds')

        return await User.query().whereNotIn('_id', friends.concat([user._id])).limit(20).fetch()

    }

    async user ({ user }) {
        
        return user

    }

    async edit ({ auth, request, response }) {

        const { username, description } = request.all();

        const user = await auth.getUser()

        const duplicatedUsername = await User.query().whereNotIn('_id', [user._id]).where('username', username).count()

        if (duplicatedUsername) return response.status(422).send([{
            message: 'Username is already taken'
        }])

        user.merge({ username, description })
        await user.save()

        return { status: 'User edited successfully', user }

    }

}

module.exports = UserController
