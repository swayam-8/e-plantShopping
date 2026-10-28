import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

export default function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalCost = item => item.cost * item.quantity;
  const calculateTotalAmount = () => cartItems.reduce(
    (sum, item) => sum + calculateTotalCost(item), 0,
  );
  const handleIncrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  const handleDecrement = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };
  const handleRemove = item => dispatch(removeItem(item.name));
  const handleContinueShopping = () => onContinueShopping();
  const handleCheckout = () => setCheckoutMessage('Coming Soon — checkout is not available yet.');

  return (
    <main className="cart-container cart-page">
      <div className="page-intro"><h1>Your shopping cart.</h1>
        <p>Total number of plants: <strong data-testid="total-quantity">{totalQuantity}</strong></p>
      </div>
      {cartItems.length ? (
        <div className="cart-layout">
          <div>
            {cartItems.map(item => (
              <article className="cart-item cart-row" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details cart-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-cost">Unit price: ${item.cost.toFixed(2)}</p>
                  <div className="cart-item-quantity quantity">
                    <button className="cart-item-button cart-item-decrement" aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => handleDecrement(item)}>−</button>
                    <span aria-label={`${item.name} quantity`}>{item.quantity}</span>
                    <button className="cart-item-button cart-item-increment" aria-label={`Increase ${item.name} quantity`}
                      onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <div className="row-total">
                  <strong className="cart-item-total">Item total: ${calculateTotalCost(item).toFixed(2)}</strong>
                  <button className="cart-item-delete delete" onClick={() => handleRemove(item)}
                    aria-label={`Delete ${item.name}`}>Delete</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div><span>Plants ({totalQuantity})</span><span>${calculateTotalAmount().toFixed(2)}</span></div>
            <div className="total"><strong>Total cart amount</strong><strong data-testid="cart-total">${calculateTotalAmount().toFixed(2)}</strong></div>
            <button className="get-started-button1 checkout-button primary" onClick={handleCheckout}>Checkout</button>
            {checkoutMessage && <p role="status" className="checkout-message">{checkoutMessage}</p>}
          </aside>
        </div>
      ) : <div className="empty-cart"><h2>Your cart is empty.</h2><p>Find a plant you will love.</p><p>Total cart amount: $0.00</p></div>}
      <button className="get-started-button continue-shopping-button continue_shopping_btn continue" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </main>
  );
}
