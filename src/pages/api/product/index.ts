// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/db'
import { createWriteStream, createReadStream } from 'fs'
import { Readable } from 'stream'
import { NextRequest } from 'next/server'

async function buffer(readable: Readable) {
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }
    return Buffer.concat(chunks)
}

// export default async function handler(
//     req: NextRequest,
//     res: NextApiResponse<any>
// ) {
//     if (req.method === 'POST') {

//         // console.log(data)

//         // const { id, name, price, description } = req.body

//         // console.log(req, 'FILE')
//         // await prisma.product.create({
//         //     data: {
//         //         name: name,
//         //         description: description,
//         //         price: price,
//         //         creatorId: id,
//         //     },
//         // })
//     }
//     res.status(200).json({ name: 'index' })
// }

export default async function POST(request: NextRequest) {
    const data = await request.formData()
    console.log(data)
}
