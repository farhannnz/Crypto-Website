import React from 'react';
import { Link } from 'react-router-dom';
import { FaBitcoinSign } from "react-icons/fa6";
const Header = () => {
  return (
    <>
    <div className="nav">
      <div className="logo">
        <h3>Crypto<FaBitcoinSign color='orange'/></h3>
      </div>
      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/exchanges">TRADE</Link></li>
      </ul>
    </div>
        <div className=" mobile-nav">
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/exchanges">TRADE</Link></li>
        </ul>
      </div>
      </>
  );
}

export default Header;
