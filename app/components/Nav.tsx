'use client'

import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillShopping } from 'react-icons/ai'

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
					<span className='bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full text-center absolute left-4 bottom-4'>
						{cartStore.cart.length}
					</span>
				</li>
				{!user && (
					<li className='bg-teal-600 text-white py-2 px-4 rounded-md'>
						<button onClick={() => signIn('google')}>Sign In</button>
					</li>
				)}
				{user && (
					<>
						<li>
							<Image
								src={user?.image!}
								alt={user?.name!}
								width={36}
								height={36}
								className='rounded-full'
								onClick={() => signOut()}
							/>
						</li>
					</>
				)}
				{cartStore.isOpen && <Cart />}
			</ul>
		</nav>
	)
}

export default Nav
