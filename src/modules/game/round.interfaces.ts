import { Document, Model, Schema } from 'mongoose'

export interface IGameRound {
    gameSessionId: Schema.Types.ObjectId
    winner: string
    loser: string
    draw: boolean
    sequence: number
    avatars: {
        X: string
        O: string
    }
    history: Array<Array<string | null>>
}

export interface IGameRoundDoc extends IGameRound, Document {}

export interface IGameRoundModel extends Model<IGameRoundDoc> {}
