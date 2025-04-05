// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Home component
import FraudDetection from './components/frauddetection'; // Fraud detection component
import SpamDetection from './components/spamdetection'; // Spam detection component
import Background from './components/background'; // Background component

const App = () => {
  return (
    <>
    <Background />
    <Router>
      {/* Home Page Component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fraud" element={<FraudDetection />} />
        <Route path="/spam" element={<SpamDetection />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
