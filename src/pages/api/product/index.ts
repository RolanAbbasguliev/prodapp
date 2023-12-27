// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { id, name, price, description } = req.body;

    await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        creatorId: id,
      },
    });
  }
  res.status(200).json({ name: 'index' });
}
