import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import Notfound from './Notfound';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const term = query.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!term) return;
    fetch(`http://localhost:5001/api/search-products?q=${encodeURIComponent(term)}`)
      .then(res => res.json())
      .then(setResults)
      .catch(console.error);
  }, [term]);

  return (
    <div className="results-container">
      <h2>Search Results for "{term}"</h2>
      {results.length === 0 ? (
        <Notfound/>
      ) : (
        <div className="results-grid">
          {results.map(p => (
            <div key={p.id} className="prod-card">
              <img src={p.image} alt={p.title} />
              <h3>{p.title}</h3>
              <p>Rating: {p.rating} ⭐</p>
              <p>
                <span className="price">${p.price.toFixed(2)}</span>
                {p.discount > 0 && <span className="discount"> -{p.discount}%</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
