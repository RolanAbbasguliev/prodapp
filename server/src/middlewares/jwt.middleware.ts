import { NextFunction, Request, Response } from 'express'
import { decodeToken } from '../utils/utils'

export const jwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = decodeToken(req.signedCookies['token'])

        if (!userId) {
            return res.status(400).json({ message: 'jwt expired' })
        }

        res.locals = {
            userId: userId,
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({ message: 'user not found' })
    }
}
