import type { Response } from 'express'

export function ok(res: Response, body: unknown = null) {
    if (body == null) return res.status(200).send()
    return res.status(200).json(body)
}

export function created(res: Response, body: unknown = null) {
    if (body == null) return res.status(201).send()
    return res.status(201).json(body)
}

export function noContent(res: Response) {
    return res.status(204).send()
}

export function badRequest(res: Response, message = 'bad_request') {
    return res.status(400).json({ error: message })
}

export function unauthorized(res: Response, message = 'unauthorized') {
    return res.status(401).json({ error: message })
}

export function serverError(res: Response, error: any) {
    return res.status(500).json({ error: String(error?.message ?? error) })
}
