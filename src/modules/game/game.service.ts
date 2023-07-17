// Update the game session with the created rounds

import { IOptions, QueryResult } from '../paginate/paginate'
import { IGameSession, IGameSessionDoc } from './game.interfaces'
import GameSession from './game.model'
import GameRound from './round.model'

/**
 * Create a game session
 * @param {IGameSession} gameSessionBody
 * @returns {Promise<IGameSession>}
 */

export const createGameSession = async (
    gameSessionBody: IGameSession
): Promise<IGameSessionDoc> => {
    const { rounds, ...rest } = gameSessionBody

    let gameSession: IGameSessionDoc

    try {
        gameSession = await GameSession.create(rest)
    } catch (error) {
        throw new Error('Failed to create game session')
    }

    if (rounds) {
        try {
            const roundPromises = rounds.map(async (round) => {
                const createdRound = await GameRound.create({
                    ...round,
                    gameSessionId: gameSession._id
                })
                return createdRound
            })

            const createdRounds = await Promise.all(roundPromises)

            gameSession.rounds = createdRounds.map((round) => round._id)

            await gameSession.save()
        } catch (error) {
            throw new Error('Failed to create rounds')
        }
    }

    return gameSession
}

/**
 * Query for game
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryGames = async (
    filter: Record<string, any>,
    options: IOptions
): Promise<QueryResult> => {
    const games = await GameSession.paginate(filter, options)

    return games
}
