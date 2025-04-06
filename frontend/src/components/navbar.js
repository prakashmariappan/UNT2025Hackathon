import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation(); // to get the current path for active link styling

  return (
    <nav className="navbar">
      
        <Link to="/"><div className="logo"></div></Link>
      
      <ul className="navbar-list">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/fraud" className={location.pathname === '/fraud' ? 'active' : ''}>Fraud Detection</Link>
        </li>
        <li>
          <Link to="/spam" className={location.pathname === '/spam' ? 'active' : ''}>Spam Detection</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
