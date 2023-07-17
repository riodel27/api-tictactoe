import Joi from 'joi'
import { IGameSession } from './game.interfaces'

const RoundSchema = Joi.object({
    sequence: Joi.number().required(),
    winner: Joi.string().allow('').required(),
    loser: Joi.string().allow('').required(),
    draw: Joi.boolean().required(),
    avatars: Joi.object({
        X: Joi.string().required(),
        O: Joi.string().required()
    }).required(),
    history: Joi.array()
        .items(Joi.array().items(Joi.string().allow(null)).length(9))
        .required()
})

const ScoreboardEntrySchema = Joi.object({
    player: Joi.string().required(),
    wins: Joi.number().required(),
    loss: Joi.number().required(),
    draw: Joi.number().required()
})

const createGameSessionBody: Record<keyof IGameSession, Joi.Schema> = {
    player1: Joi.string().required(),
    player2: Joi.string().required(),
    rounds: Joi.array().items(RoundSchema),
    scoreboard: Joi.array().items(ScoreboardEntrySchema)
}

export const createGameSession = {
    body: Joi.object().keys(createGameSessionBody)
}

export const getGamesSession = {
    query: Joi.object().keys({
        populate: Joi.string().valid('rounds'),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
}
