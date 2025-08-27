import React, { useEffect, useState  } from 'react';
import './HomeData.css';
import Product from './Product';
import axios from 'axios';






const HomeData = () => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    axios.get('https://float-store-backend.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);
  
  return (
    <>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg"
            alt="Luxury Fashion"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
         <h1 className="hero-title">
  NOIR<br />
  <span className="highlight">ETERNAL</span>
</h1>

         
          <div className="hero-buttons">
            <button className="btn-luxury btn-xl">Explore Collection</button>
            <button className="btn-premium btn-xl">Book Consultation</button>
          </div>
          <p className="hero-note">Free worldwide shipping on orders over $500</p>
        </div>
      </section>


<section className="story-section">
      <div className="story-container">
        <div className="story-text">
          <h2 className="section-title">Our Story</h2>
          <div className="story-paragraphs">
            <p>
              Born from shadows and shaped by elegance, Acres emerged to challenge the ordinary.
              We don't just craft garments — we summon statements that speak in whispers of velvet and declarations of obsidian.
            </p>
            <p>
              Every piece is meticulously designed with opulence, mystery, and sophistication — a rebellion against the disposable age of fashion.
            </p>
            <p>
              For the discerning few who embrace the night, Acres is more than a brand. It’s a legacy draped in silk and sharpened in silver.
            </p>
          </div>
        </div>

        <div className="story-stats">
          <div className="stat-box">
            <div className="stat">
              <div className="stat-value">10+</div>
              <div className="stat-label">Years Crafting Darkness</div>
            </div>
            <div className="stat">
              <div className="stat-value">50K</div>
              <div className="stat-label">Loyal Customers</div>
            </div>
            <div className="stat">
              <div className="stat-value">5</div>
              <div className="stat-label">Exclusive Collections</div>
            </div>
            <div className="stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Timeless Statements</div>
            </div>
          </div>
        </div>
      </div>
    </section>

 


      {/* Product Carousel Section */}
      <section className="home-products-section">
        <div className="home-container">
          <h2 className="section-title"> Products</h2>
      
            <div className="products-row">
              {products.slice(0, 3).map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  price={`$${product.price}`}
                  discount={product.discount}
                />
              ))}
            </div>
          
        </div>
      </section>

   
 
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="section-title">Join Our Exclusive Circle</h2>
          <p className="newsletter-text">
            Be the first to discover new collections, exclusive events, and receive personalized styling consultations
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="btn-luxury btn-lg">Subscribe</button>
          </div>

          <p className="newsletter-note">Unsubscribe at any time. We respect your privacy.</p>
        </div>
      </section>
    </>
  );
};

export default HomeData;



