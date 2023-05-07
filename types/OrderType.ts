import { ProductType } from './ProductType'

export type OrderType = {
	id: string
	products: ProductType[]
	amount: number
	createdAt: string
	userId: string
	status: string
	paymentIntentId: string
}
