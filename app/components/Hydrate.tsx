'use client'
import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Roboto, Lobster_Two } from 'next/font/google'
import { useThemeStore } from '@/store'

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-robot',
})

const Hydrate = ({ children }: { children: ReactNode }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	const themeStore = useThemeStore()

	return (
		<SessionProvider>
			{isHydrated ? (
				<body
					className={`px-4 lg:px-48 ${roboto.className} min-h-screen`}
					data-theme={themeStore.mode}
				>
					{children}
				</body>
			) : (
				<body>
					<div>...Loading</div>
				</body>
			)}
		</SessionProvider>
	)
}

export default Hydrate
