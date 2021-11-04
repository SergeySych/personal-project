import {Document} from 'mongoose'

export interface MulterFile{
    key: string
    mimetype: string
    originalname: string
    size: number
    buffer: number[]
}

export interface IUser extends Document{
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: string
    sex: string
    img: string
}