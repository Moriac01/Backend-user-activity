import express from 'express'
import type { UserService, LoginOutput } from '../domain/user.service'
import { created, ok, noContent, badRequest, unauthorized, serverError } from '../../../lib/http'

export function createUserController(service: UserService) {
    const router = express.Router()

   
    router.post('/', async (req, res) => {
        try {
            const { email, password, username } = req.body as { email?: string; password?: string; username?: string }
            if (!email || !password) return badRequest(res, 'email and password are required')
            const user = await service.createUser({ email, password, username })
            return created(res, { id: user.id, email: user.email, username: user.username })
        } catch (err: any) {
            return serverError(res, err)
        }
    })

    
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body as { email?: string; password?: string }
            if (!email || !password) return badRequest(res, 'email and password are required')
            const out = await service.loginUser(email, password) as LoginOutput | null
            if (!out) return unauthorized(res, 'invalid_credentials')
            return ok(res, out)
        } catch (err: any) {
            return serverError(res, err)
        }
    })


    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id
            if (!id) return badRequest(res, 'id required')
            await service.deleteUser(id)
            return noContent(res)
        } catch (err: any) {
            return serverError(res, err)
        }
    })

    return router
}

export default createUserController
