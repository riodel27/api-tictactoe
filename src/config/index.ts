/* eslint-disable no-undef */
import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
    port: parseInt(<string>process.env.PORT, 10),
    databaseURL: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DATABASE}`,
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },
    env: process.env.NODE_ENV
}
