import React, { useEffect, useState } from 'react';
import Product from './Product';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    chunkedProducts.push(products.slice(i, i + 3));
  }

  return (
    <div className='product-container1'>
      {chunkedProducts.map((row, rowIndex) => (
        <div className='products-row1' key={rowIndex}>

          <p>All Products</p>
          {row.map(product => (
            <Product
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              rating={product.rating}
              price={`$${product.price}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;

