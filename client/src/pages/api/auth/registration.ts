import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/db/db'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { createToken } from '@/utilities/jwt'
import { setCookie } from '@/utilities/utils'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        try {
            const { email, name, password } = req.body

            const hash = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    passwordHash: hash,
                },
            })

            const token = await createToken(user?.id!)
            setCookie(req, res, token)

            res.status(200).json({ message: 'Registration Success' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: `Error: ${e}` })
        }
    } else {
        res.status(400).json({ message: 'Bad request' })
    }
}
