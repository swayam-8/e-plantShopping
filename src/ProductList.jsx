import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';

const photo = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
const pictures = [
  'photo-1416879595882-3373a0480b5b', 'photo-1459411621453-7b03977f4bfc',
  'photo-1485955900006-10f4d324d411', 'photo-1501004318641-b39e6451bec6',
  'photo-1497250681960-ef046c08a56e', 'photo-1463320726281-696a485928c7',
];

export const plantsArray = [
  {
    category: 'Air-purifying plants',
    plants: [
      { name: 'Snake Plant', cost: 25, description: 'Sculptural foliage for a bright green corner.', image: photo(pictures[0]) },
      { name: 'Peace Lily', cost: 22, description: 'Elegant blooms and lush green leaves.', image: photo(pictures[1]) },
      { name: 'Spider Plant', cost: 16, description: 'Playful arching leaves for shelves.', image: photo(pictures[2]) },
      { name: 'Boston Fern', cost: 24, description: 'Soft and feathery green fronds.', image: photo(pictures[3]) },
      { name: 'Rubber Plant', cost: 32, description: 'Glossy leaves with a bold silhouette.', image: photo(pictures[4]) },
      { name: 'Golden Pothos', cost: 18, description: 'Graceful golden trailing vines.', image: photo(pictures[5]) },
    ],
  },
  {
    category: 'Aromatic plants',
    plants: [
      { name: 'Lavender', cost: 20, description: 'Delicate flowers and a calming scent.', image: photo(pictures[1]) },
      { name: 'Rosemary', cost: 15, description: 'Fragrant foliage for sunny windowsills.', image: photo(pictures[2]) },
      { name: 'Jasmine', cost: 28, description: 'Sweetly scented flowers to brighten a room.', image: photo(pictures[3]) },
      { name: 'Sweet Basil', cost: 12, description: 'A fresh and fragrant kitchen favorite.', image: photo(pictures[4]) },
      { name: 'Mint', cost: 10, description: 'Refreshing leaves for your kitchen garden.', image: photo(pictures[5]) },
      { name: 'Lemon Balm', cost: 14, description: 'Soft leaves with a cheerful citrus aroma.', image: photo(pictures[0]) },
    ],
  },
  {
    category: 'Easy-care plants',
    plants: [
      { name: 'ZZ Plant', cost: 30, description: 'Deep green leaves and a carefree spirit.', image: photo(pictures[2]) },
      { name: 'Jade Plant', cost: 19, description: 'Rounded succulent leaves in a compact form.', image: photo(pictures[3]) },
      { name: 'Aloe Vera', cost: 17, description: 'Architectural leaves for a sunny spot.', image: photo(pictures[4]) },
      { name: 'Zebra Haworthia', cost: 14, description: 'Compact succulent with striking stripes.', image: photo(pictures[5]) },
      { name: 'Heartleaf Philodendron', cost: 23, description: 'Heart-shaped leaves on trailing vines.', image: photo(pictures[0]) },
      { name: 'Ponytail Palm', cost: 35, description: 'A playful plant for your brightest corner.', image: photo(pictures[1]) },
    ],
  },
];

export default function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cart_quantity_count = totalQuantity;

  useEffect(() => {
    setAddedToCart(Object.fromEntries(cartItems.map(item => [item.name, true])));
  }, [cartItems]);

  const handleAddToCart = plant => {
    dispatch(addItem(plant));
    setAddedToCart(previous => ({ ...previous, [plant.name]: true }));
  };
  const handleParadiseNurseyClick = event => { event.preventDefault(); onHomeClick(); };
  const handleHomeClick = event => handleParadiseNurseyClick(event);
  const handlePlantsClick = event => { event.preventDefault(); setShowCart(false); };
  const handleCartClick = event => { event.preventDefault(); setShowCart(true); };
  const handleContinueShopping = () => setShowCart(false);

  const Navbar = () => (
    <header className="navbar">
      <a href="#home" className="brand" onClick={handleParadiseNurseyClick}><span className="brand-icon">❧</span>
        <span>Paradise Nursery<small>BRING LIFE HOME</small></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" onClick={handleHomeClick}>Home</a>
        <a href="#plants" onClick={handlePlantsClick} aria-current={!showCart ? 'page' : undefined}>Plants</a>
        <a href="#cart" className="cart-link" onClick={handleCartClick}
          aria-current={showCart ? 'page' : undefined} aria-label={`Cart, ${totalQuantity} items`}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 3h2l3 12h11l2-8H6M9 20h.01M18 20h.01" />
          </svg>
          Cart <span id="cart_quantity_count" className="cart_quantity_count cart-quantity" data-testid="cart-count">{cart_quantity_count}</span>
        </a>
      </nav>
    </header>
  );

  return (
    <>
      <Navbar />
      {showCart ? <CartItem onContinueShopping={handleContinueShopping} /> : (
        <main className="catalog">
          <div className="page-intro"><p className="eyebrow">YOUR OWN LITTLE PARADISE</p>
            <h1>Find your green companion.</h1><p>Thoughtfully chosen plants for a happier home.</p>
          </div>
          {plantsArray.map(group => (
            <section className="product-list plant-section" key={group.category}>
              <div className="section-title"><h2>{group.category}</h2><span>{group.plants.length} plants to discover</span></div>
              <div className="plant-grid">
                {group.plants.map(plant => (
                  <article className="plant-card" key={plant.name}>
                    <div className="plant-image"><img src={plant.image} alt={plant.name} loading="lazy" /></div>
                    <div className="plant-info">
                      <div className="plant-heading"><h3>{plant.name}</h3><strong>${plant.cost.toFixed(2)}</strong></div>
                      <p>{plant.description}</p>
                      <button className="product-button" disabled={Boolean(addedToCart[plant.name])}
                        onClick={() => handleAddToCart(plant)}>
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}
    </>
  );
}
