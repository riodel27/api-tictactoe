import express, { Router } from 'express'

import { gameController, gameValidation } from '../modules/game'
import validate from '../modules/validate/validate.middleware'

const router: Router = express.Router()

router
    .route('/add')
    .post(validate(gameValidation.createGameSession), gameController.createGameSession)

router.route('/list').get(validate(gameValidation.getGamesSession), gameController.getGamesSession)

export default router
