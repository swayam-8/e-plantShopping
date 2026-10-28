import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import './App.css';

export default function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => setShowProductList(true);
  const handleHomeClick = () => setShowProductList(false);

  if (showProductList) {
    return <ProductList onHomeClick={handleHomeClick} />;
  }

  return (
    <div className="app-container">
      <header>
        <div className="brand"><span className="brand-icon">❧</span>
          <span>Paradise Nursery<small>BRING LIFE HOME</small></span>
        </div>
      </header>
      <main>
        <section className="background-image hero">
          <div className="hero-content">
            <p className="eyebrow">A GREENER HOME STARTS HERE</p>
            <h1>Welcome to Paradise Nursery</h1>
            <p>Beautiful plants. Brighter spaces.<br />Bring nature home.</p>
            <button className="get-started-button primary" onClick={handleGetStarted}>
              Get Started <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
        <AboutUs />
      </main>
      <footer><span>❧ Paradise Nursery</span><p>Make room for a little green.</p></footer>
    </div>
  );
}
