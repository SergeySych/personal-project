import {Schema, model, Model} from 'mongoose'
import { IUser } from '../helper'

const userSchema: Schema = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: String, required: true},
    sex: {type: String},
    img: {type: String}
})
const User: Model<IUser> = model('User', userSchema)

export default User