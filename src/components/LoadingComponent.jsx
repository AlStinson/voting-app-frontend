import React from 'react';
import './LoadingComponent.css'; // Import the external CSS file for styling

const LoadingComponent = ({children}) => {
  return (<>
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
    {children}
  </>
  );
};

export default LoadingComponent;