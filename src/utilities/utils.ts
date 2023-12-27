import { setCookie as setCook } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createToken } from '@/utilities/jwt'

export const setCookie = (
    req: NextApiRequest,
    res: NextApiResponse,
    email: string
) => {
    const token = createToken(email)
    setCook('token', token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 7,
    })
}
