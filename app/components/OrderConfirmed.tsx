'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { useCartStore } from '@/store'
import cat from '@/public/cat.gif'

const OrderConfirmed = () => {
	const cartStore = useCartStore()
	useEffect(() => {
		cartStore.setPaymentIntent('')
		cartStore.clearCart()
	}, [])

	return (
		<motion.div
			className='flex items-center justify-center my-12'
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<div className='p-12 rounded-md text-center'>
				<h1 className='text-xl font-medium'>Your order has been placed 🚀</h1>
				<h2 className='text-sm my-4'>Check your email for receipt</h2>
				<Image src={cat} alt='giffy' className='py-8' />
				<div className='flex items-center justify-center gap-12'>
					<Link href={'/dashboard'}>
						<button
							onClick={() => {
								cartStore.setCheckout('cart')
								cartStore.toggleCart()
							}}
							className='font-medium'
						>
							Check your order
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	)
}

export default OrderConfirmed
