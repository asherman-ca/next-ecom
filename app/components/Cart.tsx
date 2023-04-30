'use client'
import Image from 'next/image'
import { useCartStore } from '@/store'

const Cart = () => {
	const cartStore = useCartStore()

	return <div>Cart</div>
}

export default Cart
