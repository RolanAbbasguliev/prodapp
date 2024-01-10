import { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@gmail.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null

                const user = await prisma?.user.findFirst({
                    where: { email: credentials.email },
                })

                const validPassword = await bcrypt.compare(
                    credentials.password,
                    user?.passwordHash!
                )

                if (user && validPassword) {
                    const { passwordHash, id, ...userWithoutPassword } = user

                    userWithoutPassword as User
                }

                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOG_CLIENT_SECRET ?? '',
        }),
    ],
}
