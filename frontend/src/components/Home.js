import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
        
      {/* Hero Section with App Name */}
      <div className="hero-section">
        <h1>Fraud Guard</h1>
        <p>Your ultimate fraud detection solution for bank employees. <br/> Detect fraud, spam, and more in real-time!</p>
        <Link to="/about" className="about-link">
          Developed by Cracking Code
        </Link>
      </div>
      <div className="linearboxhome"></div>
      {/* Services Section 
      <div className="services">
        <Link to="/fraud" className="service-link">
          Fraud Detection
        </Link>
        <Link to="/spam" className="service-link">
          Spam Detection
        </Link>
      </div>*/}
      
    </div>
  );
};

export default Home;
