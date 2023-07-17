import express, { Router } from 'express'

import gameRoute from './game.route'

const router = express.Router()

interface IRoute {
    path: string
    route: Router
}

const defaultIRoute: IRoute[] = [
    {
        path: '/game',
        route: gameRoute
    }
]

defaultIRoute.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
