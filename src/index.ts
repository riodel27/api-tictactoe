import mongoose from 'mongoose'

import app from './app'
import config from './config'
import logger from './logger'

mongoose
    .connect(config.databaseURL)
    .then(() => {
        logger.info('Connected to MongoDB')
        app.listen(config.port, () => {
            logger.info(`Listening to port ${config.port}`)
        })
    })
    .catch((error) => {
        logger.info('Unable to connect to MongoDB: ', error)
    })
