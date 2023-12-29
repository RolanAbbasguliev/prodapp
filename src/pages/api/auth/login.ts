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
                String(password),
                user?.passwordHash!
            )

            if (!validPassword) {
                res.status(400).json({ message: 'Password error' })
            }
            const token = createToken(user?.id!)
            setCookie(req, res, token)

            res.status(200).json({ message: 'Success' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Error' })
        }
    } else {
        res.status(400).json({ message: 'Bad request' })
    }
}
