import jwt, { JwtPayload } from 'jsonwebtoken'

export const createToken = (id: number) => {
    const token = jwt.sign(
        {
            userId: id,
        },
        process.env.JWT_SECRET!,
        { expiresIn: 60 * 60 * 24 * 7 }
    )

    return token
}

export const decodeToken = (token: string) => {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        return decode.userId as number
    } catch (e) {
        console.log(e)
        return null
    }
}
