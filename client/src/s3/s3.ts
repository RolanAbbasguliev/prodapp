import EasyYandexS3 from 'easy-yandex-s3'

export const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.S3_KEY!,
        secretAccessKey: process.env.S3_SECRET!,
    },
    Bucket: 'prodappbucket',
    debug: true,
})
 
