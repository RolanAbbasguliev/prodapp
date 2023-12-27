import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
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

            await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    passwordHash: hash,
                },
            })

            setCookie(req, res, email)

            res.status(200).json({ message: 'Success' })
        } catch (e) {
            res.status(400).json({ message: `Error: ${e}` })
        }
    } else {
        res.status(400).json({ message: 'Bad request' })
    }
}
