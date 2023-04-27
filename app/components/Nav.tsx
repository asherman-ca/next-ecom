'use client'

// import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

type userType = {
	name?: string | null | undefined
	email?: string | null | undefined
	image?: string | null | undefined
}

const Nav = ({ user }: { user: userType | undefined }) => {
	return (
		<nav className='flex justify-between items-center py-8'>
			<h1>styled</h1>
			<ul className='flex items-center gap-12'>
				<li>Products</li>
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
								width={48}
								height={48}
								className='rounded-full'
							/>
							<button onClick={() => signOut()}>Sign Out</button>
						</li>
						<li>Dashboard</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Nav
