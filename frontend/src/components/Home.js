import React from 'react';


const Home = () => {
  return (
    <div className="home-container">
        
      {/* Hero Section with App Name */}
      <div className="hero-section">
        <h1 className='hero-title'>Fraud Guard</h1>
        <p>Your ultimate fraud detection solution for bank employees. <br/> Detect fraud, spam, and more in real-time!</p>
        <a 
          href="https://github.com/prakashmariappan/UNT2025Hackathon/tree/master" 
          className="about-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Developed by Cracking Code
        </a>
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
