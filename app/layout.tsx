import './globals.css'
import { getServerSession } from 'next-auth/next'
import { Roboto, Lobster_Two } from 'next/font/google'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Nav from './components/Nav'
import Hydrate from './components/Hydrate'

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-robot',
})

const lobster = Lobster_Two({
	weight: '700',
	subsets: ['latin'],
	variable: '--font-lobster',
})

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	return (
		<html lang='en'>
			<Hydrate>
				<Nav user={session?.user} />
				{children}
			</Hydrate>
		</html>
	)
}
