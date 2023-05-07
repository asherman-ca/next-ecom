import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2022-11-15',
})

const prisma = new PrismaClient()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const user = await getServerSession(req, res, authOptions)
			if (!user) {
				res.status(403).json({ message: 'Not logged in' })
			}
			const orders = await prisma.order.findMany({
				where: {
					userId: user?.user?.id,
				},
				include: {
					products: true,
				},
			})
			res.status(200).json(orders)
		} catch (err) {
			console.log(err)
			res.status(500).json({ message: 'Something went wrong' })
		}
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method Not Allowed')
	}
}
