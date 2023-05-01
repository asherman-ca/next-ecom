'use client'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import shipping from '@/public/shipping.png'

const Cart = () => {
	const cartStore = useCartStore()

	const totalPrice = cartStore.cart.reduce((acc, item) => {
		return acc + item.unit_amount! * item.quantity!
	}, 0)

	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			onClick={() => cartStore.toggleCart()}
			className='fixed w-full h-screen left-0 top-0 bg-black/25'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-white absolute	right-0 top-0 w-full lg:w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'
			>
				<button
					className='text-sm pb-12 font-bold'
					onClick={() => cartStore.toggleCart()}
				>
					Close cart
				</button>
				{cartStore.cart.map((item) => (
					<motion.div layout className='flex py-4 gap-4' key={item.id}>
						<Image
							className='rounded-md h-24'
							src={item.image}
							alt={item.name}
							width={120}
							height={120}
						/>
						<div>
							<h2>{item.name}</h2>
							<div className='flex gap-2'>
								<h2>Quantity: {item.quantity}</h2>
								<button onClick={() => cartStore.removeProduct(item)}>
									<IoRemoveCircle />
								</button>
								<button
									onClick={() =>
										cartStore.addProduct({
											id: item.id,
											image: item.image,
											name: item.name,
											unit_amount: item.unit_amount,
											quantity: item.quantity,
										})
									}
								>
									<IoAddCircle />
								</button>
							</div>
							<p className='text-sm'>
								{item.unit_amount && formatPrice(item.unit_amount)}
							</p>
						</div>
					</motion.div>
				))}
				{cartStore.cart.length > 0 && (
					<motion.button
						layout
						className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'
					>
						Checkout {formatPrice(totalPrice)}
					</motion.button>
				)}
				<AnimatePresence>
					{cartStore.cart.length === 0 && (
						<motion.div
							className='flex flex-col items-center justify-center gap-12 text-2xl font-medium opacity-75'
							animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
							initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
							exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
						>
							Empty Cart
							<Image
								// src={'/shipping.png'}
								src={shipping}
								height={200}
								width={200}
								alt='shipping'
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}

export default Cart
