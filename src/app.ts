import cors from 'cors'
import express from 'express'
import httpStatus from 'http-status'

import ApiError from './modules/errors/ApiError'
import { errorConverter, errorHandler } from './modules/errors/error'
import routes from './routes'

const app = express()

// enable cors
app.use(cors())
app.options('*', cors())

app.use(express.json())

app.get('/', (_, res) => res.send('✌️Welcome to TICTACTOE API'))

// api routes
app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
