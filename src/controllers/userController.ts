import UserService from '../service/userService.js'
import {Request, Response} from 'express'

class UserController {
    async registration(req: Request, res: Response) {
        try {
            const register = await UserService.registration(req.body)
            register.rejected ? res.status(400).send(register)
                         : res.status(200).send(register)

        }catch (e) {
            console.log(e)
        }
    }
    async login(req: Request, res: Response) {
        try {
            const login = await UserService.login(req.body)
            login.rejected ? res.status(400).send(login)
                : res.status(200).send(login)
        }catch (e) {
            console.log(e)
        }
    }
    async getUser(req: Request, res: Response) {
        try {
            const {username} = req.params
            const consumer = req.query.consumer ? 'authUser' : 'noAuthUser'

            if(!username){
                return res.status(404).send(req.query.username)
            }

            const user = await UserService.getUserByUsername(username as string, consumer as string)
            user.rejected ? res.status(400).send(user)
                : res.status(200).send(user)

        }catch (e) {
            console.log(e)
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers()
            users.rejected ? res.status(400).send(users)
                : res.status(200).send(users)
        }catch (e) {
            console.log(e)
        }
    }
}

export default new UserController()