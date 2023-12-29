// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/db'
import { createWriteStream, createReadStream } from 'fs'
import { Readable } from 'stream'
import { NextRequest } from 'next/server'
import fs from 'fs'
import { s3 } from '@/s3/s3'
import { getContext } from '@/utilities/contentx'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        try {
            console.log('WTF')
            const { name, description, price, id, file } = JSON.parse(req.body)
            const base64 = file.split(';base64,').pop()
            const buf = Buffer.from(base64, 'base64')

            res.status(200).json({ foo: getContext(req, 'foo') })

            // await prisma.product.create({
            //     data: {
            //         name: name,
            //         description: description,
            //         price: price,
            //         creatorId: id,
            //     },
            // })

            // console.log

            // let upload = await s3.Upload(
            //     {
            //         buffer: buf,
            //         name: 'sosi.jpeg',
            //     },
            //     '/test/'
            // )

            // console.log(upload)
        } catch (e) {
            console.log(e)
        }

        // console.log(data)

        // const { id, name, price, description } = req.body

        // console.log(req, 'FILE')
    }
    res.status(200).json({ name: 'index' })
}
