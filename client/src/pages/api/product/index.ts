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
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const userId = await cookieGetUserId(req)

            if (!userId) {
                res.status(400).json({ message: 'User not found' })
            }

            const { name, description, price, image } = JSON.parse(req.body)

            let imageId = uuidv4()
            await prisma.product.create({
                data: {
                    name: name,
                    description: description,
                    price: Number(price),
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

            res.status(200).json({ message: 'Product successfully created' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Create product failed' })
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
            res.status(400).json({ message: 'Get products failed' })
        }
    }
    if (req.method === 'PUT') {
        try {
            const userId = await cookieGetUserId(req)
            const { name, description, price, imageId } = req.body
            console.log(req.body)

            const update = await prisma.product.update({
                where: {
                    creatorId: userId,
                    s3ImageId: imageId,
                },
                data: {
                    name: name || undefined,
                    description: description || undefined,
                    price: Number(price) || undefined,
                },
            })
            res.status(200).json({
                message: 'Product info successfully updated',
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'UPDATE product failed' })
        }
    }
    res.status(400).json({ message: 'Bad Request' })
}
