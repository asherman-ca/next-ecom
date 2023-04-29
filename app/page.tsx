import Stripe from 'stripe'
import Product from './components/Product'

// type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
// 	...args: any
// ) => Promise<infer R>
// 	? R
// 	: any
// const products: AsyncReturnType<typeof getProducts> = await getProducts()

const getProducts = async () => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: '2022-11-15',
	})
	const products = await stripe.products.list()

	const productsWithPrices = await Promise.all(
		products.data.map(async (product) => {
			const price = await stripe.prices.list({
				product: product.id,
			})
			return {
				id: product.id,
				unit_amount: price.data[0].unit_amount,
				name: product.name,
				description: product.description,
				images: product.images,
				currency: price.data[0].currency,
			}
		})
	)

	return productsWithPrices
}

export default async function Home() {
	const products = await getProducts()

	return (
		<main className='grid grid-cols-fluid gap-12'>
			{products.map((product) => (
				<Product key={product.id} {...product} />
			))}
		</main>
	)
}
