import { setCookie as setCook } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createToken } from '@/utilities/jwt'
import * as jose from 'jose'

export const setCookie = (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string
) => {
    setCook('token', token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 7,
    })
}

export const cookieGetUserId = async (req: NextApiRequest) => {
    let token = req.headers.cookie
    token = token?.replace('token', '').replace('=', '')
    if (!token) {
        return
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jose.jwtVerify(token!, secret)
    if (!payload) return
    return payload.userId as number
}
