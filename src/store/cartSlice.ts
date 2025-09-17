import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '../types'

export type CartState = { items: CartItem[] }

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<Product>) {
			const existing = state.items.find(i => i.id === action.payload.id)
			if (existing) {
				existing.quantity += 1
			} else {
				state.items.push({ ...action.payload, quantity: 1 })
			}
		},
		updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
			const it = state.items.find(i => i.id === action.payload.id)
			if (!it) return
			if (action.payload.quantity <= 0) {
				state.items = state.items.filter(i => i.id !== action.payload.id)
			} else {
				it.quantity = action.payload.quantity
			}
		},
		clearCart(state) {
			state.items = []
		}
	}
})

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
