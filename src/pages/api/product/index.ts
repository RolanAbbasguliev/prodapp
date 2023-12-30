// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/db'
import { createWriteStream, createReadStream } from 'fs'
import { Readable } from 'stream'
import { NextRequest } from 'next/server'
import fs from 'fs'
import { s3 } from '@/s3/s3'
import { v4 as uuidv4 } from 'uuid'
import { getContext } from '@/utilities/contentx'
import * as jose from 'jose'
import { cookieGetUserId } from '../../../utilities/utils'

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
            const userId = await cookieGetUserId(req)

            if (!userId) {
                res.status(400).json({ message: 'User not found' })
            }

            let { name, description, price, image } = JSON.parse(req.body)

            price = Number(price)

            if (image) {
                let imageId = uuidv4()
                await prisma.product.create({
                    data: {
                        name: name,
                        description: description,
                        price: price,
                        creatorId: userId!,
                        s3ImageId: imageId,
                    },
                })

                const base64 = image.split(';base64,').pop()
                const buf = Buffer.from(base64, 'base64')

                let upload = await s3.Upload(
                    {
                        buffer: buf,
                        name: `${imageId}.jpeg`,
                    },
                    `${userId}/`
                )
            }

            await prisma.product.create({
                data: {
                    name: name,
                    description: description,
                    price: price,
                    creatorId: userId!,
                    s3ImageId: '',
                },
            })
        } catch (e) {
            res.status(400).json({ message: 'User not found' })
        }
    }
    if (req.method === 'GET') {
        try {
            const userId = await cookieGetUserId(req)

            const imgs = await prisma.product.findMany({
                where: {
                    creatorId: userId,
                },
                select: {
                    s3ImageId: true,
                },
            })

            const s3ImgIdArr: string[] = []
            const arr = imgs.filter((img) => img.s3ImageId !== '')

            arr.map((img) => s3ImgIdArr.push(img.s3ImageId!))

            res.status(200).json(s3ImgIdArr)
        } catch (e) {
            res.status(400).json({ message: 'User not found' })
        }
    }
    res.status(400)
}
