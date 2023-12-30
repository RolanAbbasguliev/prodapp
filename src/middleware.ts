import { NextRequest, NextResponse } from 'next/server'
import { getCookie, getCookies } from 'cookies-next'
import { withContext } from './utilities/contentx'
import * as jose from 'jose'

type Data = {
    message: string
}

const allowedContextKeys = ['token']

export default withContext(
    allowedContextKeys,
    (setContext: (arg1: string, arg2: string) => void, req: NextRequest) => {
        // const token = req.cookies.get('token')?.value

        // if (!token) {
        //     return NextResponse.json(
        //         {
        //             message: 'No token provided',
        //         },
        //         { status: 400 }
        //     )
        // }

        // const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
        // const { payload } = await jose.jwtVerify(token, secret)
        // console.log(token, payload)
        // setContext('token', token)
        return NextResponse.next()
    }
)

export const config = {
    matcher: '/api/product/:path*',
}
