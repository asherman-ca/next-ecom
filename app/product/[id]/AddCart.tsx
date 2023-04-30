'use client'

import { useCartStore } from '@/store'
import { AddCartType } from '@/types/AddCartType'

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
	const cartStore = useCartStore()
	return (
		<button
			onClick={() =>
				cartStore.addProduct({ name, id, image, unit_amount, quantity })
			}
			className='text-white py-2 px-6 font-medium rounded-md bg-teal-700 mt-12'
		>
			Add to cart
		</button>
	)
}

export default AddCart
