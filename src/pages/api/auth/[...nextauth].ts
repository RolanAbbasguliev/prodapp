import { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth/next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { PrismaClient } from '@prisma/client'
import prisma from '../../../db/db'
import { Browser } from '@capacitor/browser'
import { pages } from 'next/dist/build/templates/app-page'

export const authConfig: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                email: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'example@gmail.com ',
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email) return null

                const user = await prisma?.user.findFirst({
                    where: { email: credentials.email },
                })

                if (!user) return null

                if (user) {
                    const { passwordHash, ...userWithoutPassword } = user

                    const returnUser: User = JSON.parse(
                        JSON.stringify(userWithoutPassword)
                    )

                    console.log('RETURN', returnUser)

                    return returnUser as User
                }

                return null
            },
        }),

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
        // async signIn({ profile }) {
        //     return true
        // },
        // async redirect({ url, baseUrl }) {
        //     console.log(url, baseUrl)
        //     return baseUrl
        //     return 'http://http://10.0.0.65:3000'
        // },
    },
}

export default NextAuth(authConfig)
