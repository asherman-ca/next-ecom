'use client'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutForm from './CheckoutForm'

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
					router.push('/api/auth/signin')
				}
				return res.json()
			})
			.then((res) => {
				setClientSecret(res.paymentIntent.client_secret)
				cartStore.setPaymentIntent(res.paymentIntent.id)
			})
	}, [])

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: 'stripe',
			labels: 'floating',
		},
	}

	return (
		<div>
			<button
				className='py-2 mb-4 bg-teal-700 w-full rounded-md text-white'
				onClick={() => cartStore.setCheckout('cart')}
			>
				<h1>Back to cart 🛒</h1>
			</button>
			{clientSecret && (
				<div>
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm clientSecret={clientSecret} />
					</Elements>
				</div>
			)}
		</div>
	)
}

export default Checkout
