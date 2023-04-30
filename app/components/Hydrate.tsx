'use client'
import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

const Hydrate = ({ children }: { children: ReactNode }) => {
	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<SessionProvider>
			{isHydrated ? <>{children}</> : <div>...Loading</div>}
		</SessionProvider>
	)
}

export default Hydrate
