import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { plantsArray } from './ProductList.jsx';
import { createAppStore } from './store.js';
import { addItem, updateQuantity, selectCartTotal } from './CartSlice.jsx';

describe('Paradise Nursery shopping flow', () => {
  it('provides three categories with six distinct plants each', () => {
    expect(plantsArray).toHaveLength(3);
    expect(plantsArray.every(group => group.plants.length >= 6)).toBe(true);
    const names = plantsArray.flatMap(group => group.plants.map(plant => plant.name));
    expect(new Set(names).size).toBe(18);
  });

  it('supports landing, add, totals, increment, decrement, delete, checkout and navigation', async () => {
    const user = userEvent.setup();
    render(<Provider store={createAppStore()}><App /></Provider>);
    expect(screen.getByRole('heading', { name: 'Welcome to Paradise Nursery' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Get Started/ }));
    const snake = screen.getByRole('heading', { name: 'Snake Plant' }).closest('article');
    const addButton = within(snake).getByRole('button', { name: 'Add to Cart' });
    await user.click(addButton);
    expect(addButton.disabled).toBe(true);
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    const mint = screen.getByRole('heading', { name: 'Mint', exact: true }).closest('article');
    await user.click(within(mint).getByRole('button', { name: 'Add to Cart' }));
    await user.click(screen.getByRole('link', { name: 'Cart, 2 items' }));
    expect(screen.getByTestId('cart-total').textContent).toBe('$35.00');
    await user.click(screen.getByRole('button', { name: 'Increase Snake Plant quantity' }));
    expect(screen.getByTestId('cart-total').textContent).toBe('$60.00');
    expect(screen.getByTestId('cart-count').textContent).toBe('3');
    await user.click(screen.getByRole('button', { name: 'Decrease Snake Plant quantity' }));
    expect(screen.getByTestId('cart-total').textContent).toBe('$35.00');
    await user.click(screen.getByRole('button', { name: 'Checkout', exact: true }));
    expect(screen.getByRole('status').textContent).toContain('Coming Soon');
    await user.click(screen.getByRole('button', { name: 'Delete Mint' }));
    expect(screen.getByTestId('cart-total').textContent).toBe('$25.00');
    await user.click(screen.getByRole('button', { name: 'Continue Shopping' }));
    const mintAgain = screen.getByRole('heading', { name: 'Mint', exact: true }).closest('article');
    expect(within(mintAgain).getByRole('button', { name: 'Add to Cart' }).disabled).toBe(false);
    await user.click(screen.getByRole('link', { name: 'Home', exact: true }));
    expect(screen.getByRole('heading', { name: 'Welcome to Paradise Nursery' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Get Started/ }));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });

  it('removes the last unit without negative counts or totals', async () => {
    const user = userEvent.setup();
    const store = createAppStore();
    store.dispatch(addItem(plantsArray[0].plants[0]));
    render(<Provider store={store}><App /></Provider>);
    await user.click(screen.getByRole('button', { name: /Get Started/ }));
    await user.click(screen.getByRole('link', { name: 'Cart, 1 items' }));
    await user.click(screen.getByRole('button', { name: 'Decrease Snake Plant quantity' }));
    expect(screen.getByText('Your cart is empty.')).toBeTruthy();
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(selectCartTotal(store.getState())).toBe(0);
  });

  it('ignores invalid quantities and accepts whole positive values', () => {
    const store = createAppStore();
    store.dispatch(addItem(plantsArray[0].plants[0]));
    store.dispatch(updateQuantity({ name: 'Snake Plant', quantity: -2 }));
    store.dispatch(updateQuantity({ name: 'Snake Plant', quantity: 1.5 }));
    expect(selectCartTotal(store.getState())).toBe(25);
    store.dispatch(updateQuantity({ name: 'Snake Plant', quantity: 4 }));
    expect(selectCartTotal(store.getState())).toBe(100);
  });
});
