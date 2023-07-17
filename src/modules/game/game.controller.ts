import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { IOptions } from '../paginate/paginate'
import catchAsync from '../utils/catchAsync'
import pick from '../utils/pick'
import * as gameSessionService from './game.service'

export const createGameSession = catchAsync(async (req: Request, res: Response) => {
    const game = await gameSessionService.createGameSession(req.body)
    res.status(httpStatus.CREATED).send(game)
})

export const getGamesSession = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name', 'role'])
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy', 'populate'])

    const result = await gameSessionService.queryGames(filter, options)
    res.send(result)
})
