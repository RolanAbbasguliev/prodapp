import { NextRequest, NextResponse } from 'next/server'
import { getCookie, getCookies } from 'cookies-next'

type Data = {
    message: string
}
export function middleware(req: NextRequest) {
    const res = NextResponse
    // const token = req.cookies.get('tokend')

    // if (!token) {
    //     return res.redirect(new URL('/', req.url))
    // }

    return res.next()
}

export const config = {
    matcher: '/api/product/:path*',
}
