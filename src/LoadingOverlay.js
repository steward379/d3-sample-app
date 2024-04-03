import React from 'react';
import './LoadingOverlay.css'; 

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default LoadingOverlay;