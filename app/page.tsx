'use client'
import { signIn } from 'next-auth/react'

export default function Home() {
	return (
		<main>
			<h1 className='text-lg' onClick={() => signIn('google')}>
				Hello Next 13
			</h1>
		</main>
	)
}
