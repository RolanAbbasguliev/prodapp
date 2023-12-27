import jwt from 'jsonwebtoken'

export const createToken = (email: string) => {
    const token = jwt.sign(
        {
            data: email,
        },
        process.env.JWT_SECRET!
    )
    return token
}
