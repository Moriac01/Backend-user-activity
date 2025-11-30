import express from 'express'
import type { FavoriteService } from '../domain/favorite.service'
import type { Favorite } from '../domain/favorite.entity'
import { created, noContent, ok, badRequest, serverError } from '../../../lib/http'

export function createFavoriteController(service: FavoriteService) {
    const router = express.Router()

   
    router.post('/', async (req, res) => {
        try {
            const { userId, publicationId } = req.body as Partial<Favorite>
            if (!userId || !publicationId) return badRequest(res, 'userId and publicationId are required')
            const fav = new (await import('../domain/favorite.entity')).Favorite(
                crypto.randomUUID(),
                userId,
                publicationId,
            )
            await service.addFavorite(fav)
            return created(res)
        } catch (err: any) {
            return serverError(res, err)
        }
    })

   
    router.delete('/:favoriteId', async (req, res) => {
        try {
            const favoriteId = req.params.favoriteId
            const publicationId = String(req.query.publicationId ?? '')
            if (!favoriteId || !publicationId) return badRequest(res, 'favoriteId and publicationId are required')
            await service.removeFavorite(favoriteId, publicationId)
            return noContent(res)
        } catch (err: any) {
            return serverError(res, err)
        }
    })

    // GET /favorites/user/:userId
    router.get('/user/:userId', async (req, res) => {
        try {
            const userId = req.params.userId
            if (!userId) return badRequest(res, 'userId required')
            const list = await service.getFavoritesByUser(userId)
            return ok(res, list)
        } catch (err: any) {
            return serverError(res, err)
        }
    })

    // GET /favorites/is-favorite?userId=...&publicationId=...
    router.get('/is-favorite', async (req, res) => {
        try {
            const userId = String(req.query.userId ?? '')
            const publicationId = String(req.query.publicationId ?? '')
            if (!userId || !publicationId) return badRequest(res, 'userId and publicationId required')
            const isFav = await service.isFavorite(userId, publicationId)
            return ok(res, { isFavorite: isFav })
        } catch (err: any) {
            return serverError(res, err)
        }
    })

    return router
}

export default createFavoriteController
