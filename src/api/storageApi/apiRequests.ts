import AWS from 'aws-sdk'

class ApiStore {
    s3: any

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-central-1'
        })
    }

    async getImgByKey(key: string) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
            }
            const data = await this.s3.getObject(params).promise()

            return data.Body

        } catch (e) {
            return null
        }
    }
    async uploadImg(key: string, file: number[]) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: file
            }
            return await this.s3.upload(params).promise()
        } catch (e) {
            console.log(e)
        }
    }
    async deleteImg(key: string) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            }
            await this.s3.deleteObject(params).promise()
        }catch (e) {
            console.log(e)
        }
    }
}

export default new ApiStore()