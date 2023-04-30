import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
	id: string
	name: string
	unit_amount: number
	images?: string[]
	description?: string
	quantity: number
}

type CartState = {
	isOpen: boolean
	cart: CartItem[]
	toggleCart: () => void
	addItem: (arg0: CartItem) => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			cart: [],
			isOpen: false,
			toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
			addItem: (item: CartItem) =>
				set((state) => ({ cart: [...state.cart, item] })),
		}),
		{ name: 'cart-store' }
	)
)
