import React, { useState } from "react";
import allroc from "../Images/all_roc_curves.png";
import heatmap from "../Images/correlation_heatmap.png";
import roc from "../Images/roc_curve.png";
import spam from "../Images/spam.png";

const About = () => {
  // State for managing modal visibility and image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  // Function to open the modal with the clicked image
  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

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

          <h2 className="subtitle">Visualization Snapshots:</h2>
          <div className="image-container">
            <div className="image-box" onClick={() => openModal(allroc)}>
              <img src={allroc} alt="ROC Curves" />
              <h2>All ROC Curves</h2>
            </div>
            <div className="image-box" onClick={() => openModal(heatmap)}>
              <img src={heatmap} alt="Heatmap" />
              <h2>Correlation Heatmap</h2>
            </div>
            <div className="image-box" onClick={() => openModal(roc)}>
              <img src={roc} alt="ROC Curve" />
              <h2>ROC Curve</h2>
            </div>
            <div className="image-box" onClick={() => openModal(spam)}>
              <img src={spam} alt="Spam Detection" />
              <h2>Spam Detection</h2>
            </div>
          </div>

          <h2 className="subtitle">Key outcomes:</h2>
          <p>
            The platform demonstrates the power of machine learning in fraud prevention and spam filtering, optimizing real-world applications through preprocessing and model evaluation.
          </p>
        </div>

        <a 
          href="https://github.com/prakashmariappan/UNT2025Hackathon/tree/master" 
          className=" dev" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Developed by Cracking Code
        </a>
      </div>

      {/* Modal to show enlarged image */}
      {isModalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImageSrc} alt="Enlarged" />
            <button className="modal-close" onClick={closeModal}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
