import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import bodyParser from 'body-parser'

config({path: './.env.dev'})

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()