import type { NextApiRequest, NextApiResponse } from 'next'

import { cookieGetUserId } from '../../../utilities/utils'
import { s3 } from '@/s3/s3'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        try {
            const userId = await cookieGetUserId(req)
            const { imageId } = JSON.parse(req.body)

            const download = (await s3.Download(
                `${userId}/${imageId}.jpeg`
            )) as any

            if (!imageId) {
                res.status(400).json({ message: 'Image id not provided' })
            }
            res.setHeader('Content-Type', 'application/octet-stream')
            res.send(download.data.Body)
        } catch (e) {
            console.log(e, 'ERROR')
            res.status(400).json({ message: 'User not found' })
        }
    }
}
