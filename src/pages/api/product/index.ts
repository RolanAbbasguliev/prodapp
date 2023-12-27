// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/db'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { id, name, price, description } = req.body

        // await prisma.product.create({
        //     data: {
        //         name: name,
        //         description: description,
        //         price: price,
        //         creatorId: id,
        //     },
        // })
    }
    res.status(200).json({ name: 'index' })
}
