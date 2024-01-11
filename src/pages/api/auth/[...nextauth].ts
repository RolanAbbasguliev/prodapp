import { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { PrismaClient } from '@prisma/client'
import prisma from '../../../db/db'
import { Browser } from '@capacitor/browser'

export const authConfig: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },

    providers: [
        // CredentialsProvider({
        //     name: 'credentials',
        //     credentials: {
        //         email: {
        //             label: 'Email',
        //             type: 'email',
        //             placeholder: 'example@gmail.com',
        //         },
        //         password: {
        //             label: 'Password',
        //             type: 'password',
        //         },
        //     },
        //     async authorize(credentials) {
        //         console.log(credentials, 'CREDS')
        //         if (!credentials || !credentials.email || !credentials.password)
        //             return null

        //         const user = await prisma?.user.findFirst({
        //             where: { email: credentials.email },
        //         })

        //         if (!user) {
        //             console.log('NO USER FOUND')
        //             return null
        //         }

        //         const validPassword = await bcrypt.compare(
        //             credentials.password,
        //             user?.passwordHash!
        //         )

        //         if (user && validPassword) {
        //             const { passwordHash, ...userWithoutPassword } = user

        //             return userWithoutPassword as unknown as User
        //         }

        //         return null
        //     },
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            checks: ['none'],
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            console.log(profile)
            return true
        },
        async redirect({ url, baseUrl }) {
            return 'http://localhost:3000/close'
        },
    },
}

export default NextAuth(authConfig)
