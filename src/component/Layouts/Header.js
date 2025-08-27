import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ShoppingContext from "../../Context/shopping/shoppingContext";
import { auth } from "../../firebase";

const Header = () => {
  const { basket = [], user, setUser } = useContext(ShoppingContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      auth.signOut().then(() => setUser(null));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!searchTerm.trim()) return setSuggestions([]);
      try {
        const res = await fetch(
          `http://localhost:5001/api/search?q=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSuggestions([]);
    }
  };

  const pickSuggestion = (s) => {
    setSearchTerm(s);
    navigate(`/search?q=${encodeURIComponent(s)}`);
    setSuggestions([]);
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container">
        <Link to="/home">
          <img
            src="https://see.fontimg.com/api/rf5/axjg/Mjk4ZjQ3OGM3YTlmNGEzYjhjZGQyN2EwYjYyMGEyNTEudHRm/QUNSRVM/cloister-black-light.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&s=65"
            alt="logo"
            className="logo-main"
          />
        </Link>
      </div>

      {/* Delivery Info + Search Bar */}
      <div className="header-center">
     

        <form onSubmit={submitSearch} className="header-search">
          <div className="search-container">
            <input
              type="text"
              className="header-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
            />
            {suggestions.length > 0 && (
              <ul className="autocomplete-list">
                {suggestions.map((s, idx) => (
                  <li key={idx} onClick={() => pickSuggestion(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="search-icon" title="Search">
            <SearchIcon fontSize="small" />
          </button>
        </form>
      </div>

      {/* Header Icons (Mobile) */}
      <div className="mobile-icons">
        <div
          className="header-option"
          onClick={handleAuth}
          title={user ? "Sign Out" : "Sign In"}
        >
          <AccountCircleIcon fontSize="15px" />
        </div>

        <Link
          to="/checkout"
          className="header-option"
          title="Basket"
          style={{ position: "relative" }}
        >
          <ShoppingBagIcon fontSize="15px" />
          {basket.length > 0 && (
            <span className="basket-badge">{basket.length}</span>
          )}
        </Link>

        <Link to="/orders" className="header-option" title="Orders">
          <MoreVertIcon fontSize="small" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
