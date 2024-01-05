import express, { Request, Response } from 'express'
import prisma from '../db/db'
import { jwtMiddleware } from '../middlewares/jwt.middleware'

export const productController = express.Router()

productController.use(jwtMiddleware)

productController.post('/', async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        const { name, description, price, image } = req.body

        if (image) {
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'POST product failed' })
    }
})

productController.get('/', async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        console.log(userId)
        // const product = await prisma.product.findMany({
        //     where: {
        //         creatorId: userId,
        //     },
        //     select: {
        //         s3ImageId: true,
        //     },
        // })

        // const s3ImgIdArr: string[] = []
        // const arr = product.filter((img) => img.s3ImageId !== '')
        // arr.map((img) => s3ImgIdArr.push(img.s3ImageId!))

        res.status(200).json({ message: 'GET product success' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'GET product failed' })
    }
})
