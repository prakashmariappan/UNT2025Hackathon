import React from "react";

const About = () => {
  return (
    <>
      <div className="fraud-container">
        <div className="section-header">About</div>

        <div className="content">
          <h2 className="subtitle">What the tool is about:</h2>
          <p>
            A data science platform integrating Fraud and Spam Detection using machine learning techniques across both transactional data and text messages.
          </p>

          <h2 className="subtitle">What it does:</h2>
          <ul className="circle-list">
            <li>Detects fraudulent behavior in transactional data using models like Logistic Regression and Gradient Boosting.</li>
            <li>Visualizes model performance with tools like heatmaps and confusion matrices.</li>
            <li>Classifies text messages as spam or legitimate with models like Naive Bayes and SVM.</li>
            <li>Optimizes spam filtering using NLP techniques like TF-IDF and stemming.</li>
          </ul>

          <h2 className="subtitle">Key outcomes:</h2>
          <p>
            The platform demonstrates the power of machine learning in fraud prevention and spam filtering, optimizing real-world applications through preprocessing and model evaluation.
          </p>
        </div>

        <a 
          href="https://github.com/prakashmariappan/UNT2025Hackathon/tree/master" 
          className="about-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Developed by Cracking Code
        </a>
      </div>
    </>
  );
};

export default About;
