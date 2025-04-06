import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  
  return (
    <>
      <div className="fraud-container">
        
        <div className="section-header">About</div>
        <div className="content">
      Your ultimate fraud detection solution for bank employees to detect fraud, spam, and more in real-time!
      </div>
       <Link to="/about" className="about-link">
                 Developed by Cracking Code
               </Link>
      </div>
      
    </>
  );
};

export default About;