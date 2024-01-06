import type { NextApiRequest, NextApiResponse } from 'next'
import { cookieGetUserId } from '../../../utilities/utils'
import prisma from '@/db/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const userId = await cookieGetUserId(req)
            const { imageId } = JSON.parse(req.body)

            const product = await prisma.product.findUnique({
                where: {
                    s3ImageId: imageId,
                    creatorId: userId,
                },
            })
            if (!product) {
                res.status(400).json({ message: 'Product not found' })
            }

            res.status(200).json(product)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'GET product info failed' })
        }
    } else {
        res.status(400).json({ message: 'Bad Request' })
    }
}
