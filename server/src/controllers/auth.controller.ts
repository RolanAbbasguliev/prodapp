import express, { Request, Response } from 'express'
import prisma from '../db/db'
import bcrypt from 'bcrypt'
import { createToken } from '../utils/utils'

export const authController = express.Router()

authController.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isValidPassword = await bcrypt.compare(
            String(password),
            user.passwordHash
        )

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Password error' })
        }

        const token = createToken(user.id)
        res.cookie('token', token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true,
            signed: true,
        })
        res.status(200).json({ message: 'Login success' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Login failed' })
    }
})

authController.post('/registration', async (req: Request, res: Response) => {
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
        const token = createToken(user.id)

        res.cookie('token', token, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true,
            signed: true,
        })
        res.status(200).json({ message: 'Registration success' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Registration failed' })
    }
})
