import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { authController } from './controllers/auth.controller'
import { productController } from './controllers/product.controller'

const app = express()
const port = process.env.PORT || 3005

//middlewares
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//controllers
app.use('/auth', authController)
app.use('/product', productController)

app.listen(port, () => {
    console.log(`[server]: Server is running on port ${port}`)
})
