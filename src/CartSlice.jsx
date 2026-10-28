import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload }) {
      if (!state.items.some(item => item.name === payload.name)) {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter(item => item.name !== payload);
    },
    updateQuantity(state, { payload }) {
      const quantity = Number(payload.quantity);
      const item = state.items.find(entry => entry.name === payload.name);
      if (!item || !Number.isInteger(quantity) || quantity < 0) return;
      if (quantity === 0) {
        state.items = state.items.filter(entry => entry.name !== payload.name);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartQuantity = state => state.cart.items.reduce(
  (sum, item) => sum + item.quantity, 0,
);
export const selectCartTotal = state => state.cart.items.reduce(
  (sum, item) => sum + item.cost * item.quantity, 0,
);
export default cartSlice.reducer;
