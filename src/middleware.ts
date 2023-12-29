import { NextRequest, NextResponse } from 'next/server'
import { getCookie, getCookies } from 'cookies-next'
import { withContext } from './utilities/contentx'
import jwt from 'jsonwebtoken'

type Data = {
    message: string
}

const allowedContextKeys = ['token']

export default withContext(
    allowedContextKeys,
    (setContext: (arg1: string, arg2: string) => void, req: NextRequest) => {
        const token = req.cookies.get('token')?.value

        // if (!token) {
        //     return NextResponse.json(
        //         {
        //             message: 'No token provided',
        //         },
        //         { status: 400 }
        //     )
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        // setContext('token', token)
        return NextResponse.next()
    }
)

export const config = {
    matcher: '/api/product/:path*',
}
