import React from "react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="page_topcon">
        <div className="pagebackarrow_con" onClick={() => navigate(-1)} title="Go Back">
          <button className="nav_backbtn"></button>
          <div className="pagebt backtext">Back</div>
        </div>
        <div className="section-header">About</div>
      </div>
      <div className="content">
      Your ultimate fraud detection solution specially made for bank employees.Detect fraud, spam, and more in real-time!
      </div>
      <div className="footer_name">
        <h1 className="about-link">Created by Cracking Code</h1>
      </div>
    </>
  );
};

export default About;