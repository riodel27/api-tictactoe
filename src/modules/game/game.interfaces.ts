import mongoose, { Document, Model } from 'mongoose'
import { QueryResult } from '../paginate/paginate'

interface ScoreboardEntry {
    player: string
    wins: number
    loss: number
    draw: number
}

export interface IGameSession {
    player1: string
    player2: string
    rounds?: mongoose.Types.ObjectId[]
    scoreboard?: ScoreboardEntry[]
}

export interface IGameSessionDoc extends IGameSession, Document {}

export interface IGameSessionModel extends Model<IGameSessionDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>
}
