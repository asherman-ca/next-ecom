'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillShopping } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'

import Cart from './Cart'
import { useCartStore } from '@/store'
import DarkLight from './DarkLight'

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
				<h1 className='text-2xl font-bold font-cabin'>Next-Ecom</h1>
			</Link>
			<ul className='flex items-center gap-8'>
				<li>
					<DarkLight />
				</li>
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
					<li className='py-2 px-4 rounded-md'>
						<button
							className='btn btn-primary'
							onClick={() => signIn('google')}
						>
							Sign In
						</button>
					</li>
				)}
				{user && (
					<li>
						<div className='dropdown dropdown-end cursor-pointer'>
							<Image
								src={user?.image!}
								alt={user?.name!}
								width={36}
								height={36}
								className='rounded-full'
								tabIndex={0}
							/>
							<ul
								className='dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-40'
								tabIndex={0}
							>
								<Link
									className='hover:bg-base-300 p-4 rounded-md cursor-pointer'
									href={'/dashboard'}
									onClick={() => {
										if (document.activeElement instanceof HTMLElement) {
											document.activeElement.blur()
										}
									}}
								>
									Orders
								</Link>
								<li
									className='hover:bg-base-300 p-4 rounded-md cursor-pointer'
									onClick={() => signOut()}
								>
									Sign out
								</li>
							</ul>
						</div>
					</li>
				)}
				<AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
			</ul>
		</nav>
	)
}

export default Nav
