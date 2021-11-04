declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string
            DB_URL: string
            AWS_ACCESS_KEY_ID: string
            AWS_SECRET_ACCESS_KEY: string
            AWS_BUCKET_NAME: string
        }
    }
}

export {}