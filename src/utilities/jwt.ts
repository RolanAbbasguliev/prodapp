import jwt from 'jsonwebtoken'

export const createToken = (id: number) => {
    const token = jwt.sign(
        {
            data: id,
        },
        process.env.JWT_SECRET!
    )
    return token
}
