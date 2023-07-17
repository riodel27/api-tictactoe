import { faker } from '@faker-js/faker'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import request from 'supertest'

import app from '../../app'
import config from '../../config'
import { IGameSession } from './game.interfaces'
import { default as Game, default as GameSession } from './game.model'

const expect = chai.expect

chai.use(chaiAsPromised)

const gameSessionOne = {
    _id: new mongoose.Types.ObjectId(),
    player1: faker.internet.userName(),
    player2: faker.internet.userName()
}

const gameSessionTwo = {
    _id: new mongoose.Types.ObjectId(),
    player1: faker.internet.userName(),
    player2: faker.internet.userName()
}

const gameSessionThree = {
    _id: new mongoose.Types.ObjectId(),
    player1: faker.internet.userName(),
    player2: faker.internet.userName()
}

describe('Game routes', () => {
    before(async () => {
        await mongoose.connect(config.databaseURL)
    })

    beforeEach(async () => {
        await Promise.all(
            Object.values(mongoose.connection.collections).map(async (collection) =>
                collection.deleteMany({})
            )
        )
    })

    after(async () => {
        await mongoose.disconnect()
    })

    describe('POST /api/game/add', () => {
        let newGameSession: IGameSession

        beforeEach(() => {
            newGameSession = {
                player1: faker.internet.userName(),
                player2: faker.internet.userName()
            }
        })

        it('should return 201 and successfully create new game session if data is ok', async () => {
            const res = await request(app)
                .post('/api/game/add')
                .send(newGameSession)
                .expect(httpStatus.CREATED)

            expect(res.body).to.deep.include({
                player1: newGameSession.player1,
                player2: newGameSession.player2
            })

            const dbGameSession = await Game.findById(res.body.id)

            expect(dbGameSession).to.exist

            if (!dbGameSession) return

            expect(dbGameSession).to.deep.include({
                player1: newGameSession.player1,
                player2: newGameSession.player2
            })
        })

        it('should return 400 error if player1 is invalid', async () => {
            newGameSession.player1 = ''

            await request(app)
                .post('/api/game/add')
                .send(newGameSession)
                .expect(httpStatus.BAD_REQUEST)
        })

        it('should return 400 error if player2 is invalid', async () => {
            newGameSession.player2 = ''

            await request(app)
                .post('/api/game/add')
                .send(newGameSession)
                .expect(httpStatus.BAD_REQUEST)
        })
    })

    describe('GET /api/game/list', () => {
        it('should return 200 and apply the default query options', async () => {
            await Promise.all([
                GameSession.create(gameSessionOne),
                GameSession.create(gameSessionTwo)
            ])

            const res = await request(app).get('/api/game/list').send().expect(httpStatus.OK)

            expect(res.body.results).to.have.length(2)
        })

        it('should limit returned array if limit param is specified', async () => {
            await Promise.all([
                GameSession.create(gameSessionOne),
                GameSession.create(gameSessionTwo),
                GameSession.create(gameSessionThree)
            ])

            const res = await request(app)
                .get('/api/game/list')
                .query({ limit: 2 })
                .send()
                .expect(httpStatus.OK)

            expect(res.body.results).to.have.length(2)
            expect(res.body.results[0].id).to.equal(gameSessionOne._id.toHexString())
            expect(res.body.results[1].id).to.equal(gameSessionTwo._id.toHexString())
        })
    })
})
