import ApiStore from '../api/storageApi/apiRequests'
import crypto from 'crypto'
import UserService from '../service/userService'
import {Request, Response} from 'express'
import {UpdateQuery} from 'mongoose'
import {MulterFile} from '../helper'

class ImgController {

    getImg(req: Request, res: Response) {
        try{
            const {key} = req.params
            if(!key) {
                return res.status(404).send({src: null})
            }
            ApiStore.getImgByKey(key as string)
                .then(img => {
                    if(img){
                        res.writeHead(200, {'Content-Type': 'image/jpeg'})
                            res.write(img, 'binary')
                            res.end(null, 'binary')
                    }
                    else res.status(404).send({src: null})
                })
        }catch (e) {
            console.log(e)
        }

    }
    async postImg(req: Request, res: Response) {
        const {username} = req.headers.authorization && JSON.parse(req.headers.authorization)
        try{
            const files = req.files as { [fieldname: string]: Express.Multer.File[] }
            if(!files || !files[0]) {
                return res.status(400)
            }
            const file = files[0] as unknown as MulterFile
            const fileType =  file.mimetype.split('/')
            if (file
                && file.size < 5000000.
                && fileType[0] === 'image'
                && (fileType[1] === 'jpeg' || fileType[1] === 'jpg' || fileType[1] === 'png')
            ){
                const fileName = crypto.randomBytes(10).toString('hex') + `.${fileType[1]}`
                const fileData = file.buffer
                const oldValue = await UserService.updateUser(username, {img: fileName} as unknown as UpdateQuery<string>)

                if(oldValue?.img) {
                    ApiStore.deleteImg(oldValue.img)
                }

                ApiStore.uploadImg(fileName, fileData)
                    .then(data => {
                        if (data) res.status(200).send()
                        else res.status(500).send()
                    })
            }else{
                res.status(400).send()
            }

        }catch (e) {
            console.log(e)
        }
    }
}

export default new ImgController
