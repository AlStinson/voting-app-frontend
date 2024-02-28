import React from 'react';
import './LoadingComponent.css'; // Import the external CSS file for styling

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingComponent;