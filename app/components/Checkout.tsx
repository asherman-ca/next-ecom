'use client'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const Checkout = () => {
	const cartStore = useCartStore()
	const [clientSecret, setClientSecret] = useState<string>('')
	const router = useRouter()

	useEffect(() => {
		// create a paymentIntent as soon as the page loads
		fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items: cartStore.cart,
				payment_intent_id: cartStore.paymentIntent,
			}),
		})
			.then((res) => {
				if (res.status === 403) {
					router.push('/')
				}
				return res.json()
			})
			.then((res) => {
				console.log('create payment intent response', res)
			})
	}, [])

	return (
		<div>
			<h1 onClick={() => cartStore.setCheckout('cart')}>Checkout</h1>
		</div>
	)
}

export default Checkout
