'use client'

import { useCartStore } from '@/store'
import { AddCartType } from '@/types/AddCartType'
import { useState } from 'react'

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
	const cartStore = useCartStore()
	const [added, setAdded] = useState<boolean>(false)

	const handleAddToCart = () => {
		cartStore.addProduct({ name, id, image, unit_amount, quantity })
		setAdded(true)
		setTimeout(() => {
			setAdded(false)
		}, 500)
	}

	return (
		<button
			onClick={handleAddToCart}
			disabled={added}
			className='my-4 btn btn-primary w-full'
		>
			{added ? 'Adding to cart...' : 'Add to cart'}
		</button>
	)
}

export default AddCart
