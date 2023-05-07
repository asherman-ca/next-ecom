'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillShopping } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'

import Cart from './Cart'
import { useCartStore } from '@/store'

type userType = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

const Nav = ({ user }: { user: userType | undefined }) => {
	const cartStore = useCartStore()
	return (
		<nav className='flex justify-between items-center py-12'>
			<Link href='/'>
				<h1>Next-Ecom</h1>
			</Link>
			<ul className='flex items-center gap-12'>
				<li
					onClick={() => cartStore.toggleCart()}
					className='flex items-center relative text-3xl cursor-pointer'
				>
					<AiFillShopping />
					<AnimatePresence>
						{cartStore.cart.length > 0 && (
							<motion.span
								animate={{ scale: 1 }}
								initial={{ scale: 0 }}
								exit={{ scale: 0 }}
								className='bg-primary text-white text-sm font-bold w-5 h-5 rounded-full text-center absolute left-4 bottom-4'
							>
								{cartStore.cart.length}
							</motion.span>
						)}
					</AnimatePresence>
				</li>
				{!user && (
					<li className='bg-primary py-2 px-4 rounded-md'>
						<button onClick={() => signIn('google')}>Sign In</button>
					</li>
				)}
				{user && (
					<Link href='/dashboard'>
						<li>
							<Image
								src={user?.image!}
								alt={user?.name!}
								width={36}
								height={36}
								className='rounded-full'
							/>
						</li>
					</Link>
				)}
				<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
			</ul>
		</nav>
	)
}

export default Nav
