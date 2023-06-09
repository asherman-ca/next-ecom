'use client'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import shipping from '@/public/shipping.png'
import Checkout from './Checkout'
import OrderConfirmed from './OrderConfirmed'

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
				className='bg-base-200 absolute	right-0 top-0 w-full lg:w-1/4 h-screen p-12 overflow-y-scroll'
			>
				<button
					className='text-sm pb-12 font-bold'
					onClick={() => cartStore.toggleCart()}
				>
					X
				</button>
				{cartStore.onCheckout === 'cart' && (
					<>
						{cartStore.cart.map((item) => (
							<motion.div
								layout
								className='flex p-4 gap-4 bg-base-100 rounded-md'
								key={item.id}
							>
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
								className='mt-4  w-full btn btn-primary'
								onClick={() => cartStore.setCheckout('checkout')}
							>
								Checkout {formatPrice(totalPrice)}
							</motion.button>
						)}
						<AnimatePresence>
							{cartStore.cart.length === 0 && cartStore.isOpen ? (
								<motion.div
									className='flex flex-col items-center justify-center gap-12 text-2xl font-medium opacity-75'
									animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
									initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
									exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
								>
									Empty Cart
									<Image
										src={shipping}
										height={200}
										width={200}
										alt='shipping'
									/>
								</motion.div>
							) : null}
						</AnimatePresence>
					</>
				)}
				{cartStore.onCheckout === 'checkout' && <Checkout />}
				{cartStore.onCheckout === 'success' && <OrderConfirmed />}
			</div>
		</motion.div>
	)
}

export default Cart
