import mongoose from 'mongoose'
import toJSON from '../toJSON/toJSON'
import { IGameRoundDoc, IGameRoundModel } from './round.interfaces'

const gameRoundSchema = new mongoose.Schema<IGameRoundDoc, IGameRoundModel>(
    {
        winner: { type: String },
        loser: { type: String },
        draw: { type: Boolean, default: false },
        sequence: { type: Number, required: true },
        avatars: {
            X: { type: String, required: true },
            O: { type: String, required: true }
        },
        history: {
            type: [[String]],
            required: true
        },
        gameSessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GameSession',
            required: true
        }
    },
    {
        timestamps: true
    }
)

// add plugin that converts mongoose to json
gameRoundSchema.plugin(toJSON)

const GameRound = mongoose.model<IGameRoundDoc, IGameRoundModel>('GameRound', gameRoundSchema)

export default GameRound
