import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/db'
import bcrypt from 'bcrypt'
import { setCookie } from '../../../utilities/utils'
import { createToken } from '../../../utilities/jwt'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })

            if (!user) {
                res.status(400).json({ message: 'User not found' })
            }

            const validPassword = await bcrypt.compare(
                password,
                user?.passwordHash!
            )

            if (!validPassword) {
                res.status(400).json({ message: 'Password error' })
            }
            setCookie(req, res, user?.email!)
            res.status(200).json({ message: 'Success' })
        } catch (e) {
            res.status(400).json({ message: `Error: ${e}` })
        }
        res.status(400).json({ message: 'Bad request' })
    }
}