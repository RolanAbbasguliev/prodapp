import * as jose from 'jose'

export const createToken = async (id: number) => {
    const alg = 'HS256'
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    const token = await new jose.SignJWT({ userId: id })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1w')
        .sign(secret)

    // const token = jwt.sign(
    //     {
    //         data: id,
    //     },
    //     process.env.JWT_SECRET!
    // )
    return token
}
