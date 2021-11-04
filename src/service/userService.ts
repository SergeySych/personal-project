import UserModel from '../models/userModel.js'
import {UpdateQuery} from 'mongoose'
import {IUser} from '../helper'

const returnUserDataObj = (user: IUser, consumer: string) => {
    switch (consumer) {
        case 'authUser': {
            const {username, firstName, lastName, birthday, sex, img} = user
            return {username, firstName, lastName, birthday, sex, img}
        }
        case 'noAuthUser': {
            const {username, firstName, lastName} = user
            return {username, firstName, lastName}
        }
    }
}

class UserService {
    async registration(form: IUser) {
        const {email, username} = form
        let candidate = await UserModel.findOne({$or: [{email}, {username}]})
        if (candidate){
            return {
                rejected: true,
                reason: candidate.email === form.email ? 'Email is already used' : 'Username is already used'
            }
        }

        const user = await UserModel.create(form)
        return {
            rejected: false,
            user: returnUserDataObj(user, 'authUser'),
            authorization: {username: user.username, password: user.password}
        }
    }
    async login({username, password}: IUser) {
        const user = await UserModel.findOne({$or: [{email: username}, {username}], password})
        if(user){
            return {
                rejected: false,
                user: returnUserDataObj(user, 'authUser'),
                authorization: {username: user.username, password: user.password}

            }
        }
        return {
            rejected: true,
            reason: 'Wrong username or password'
        }
    }
    async getUserByUsername(username: string, consumer: string) {
        const user: IUser | null = await UserModel.findOne({username})
        if(user){
            return {
                rejected: false,
                user: returnUserDataObj(user, consumer),
            }
        }
        return {
            rejected: true,
            reason: 'User not found'
        }
    }
    async getAllUsers() {
        const users: IUser[] = await UserModel.find()
        if(users) {
            return {
                rejected: false,
                users: users.map(u => returnUserDataObj(u, 'authUser'))
            }
        }
        return {
            rejected: true,
            reason: 'Some thing wrong'
        }
    }
    updateUser(username: string, update: UpdateQuery<string>) {
         return UserModel.findOneAndUpdate({username}, update, {returnOriginal: true})
     }
}

export default new UserService()