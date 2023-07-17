import mongoose, { Schema } from 'mongoose'
import { paginate } from '../paginate'
import toJSON from '../toJSON/toJSON'
import { IGameSessionDoc, IGameSessionModel } from './game.interfaces'

const gameSessionSchema = new mongoose.Schema<IGameSessionDoc, IGameSessionModel>(
    {
        player1: { type: String, required: true },
        player2: { type: String, required: true },
        // rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
        scoreboard: [
            {
                player: { type: String, required: true },
                wins: { type: Number, default: 0 },
                loss: { type: Number, default: 0 },
                draw: { type: Number, default: 0 }
            }
        ],
        rounds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'GameRound'
            }
        ]
    },
    {
        timestamps: true
    }
)

// add plugin that converts mongoose to json
gameSessionSchema.plugin(toJSON)
gameSessionSchema.plugin(paginate)

// TODO: improvements like virtual for calculating scoreboard.

const GameSession = mongoose.model<IGameSessionDoc, IGameSessionModel>(
    'GameSession',
    gameSessionSchema
)

export default GameSession
