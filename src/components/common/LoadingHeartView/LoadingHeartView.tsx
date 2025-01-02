import React from 'react';

const LoadingHeartView: React.FC = () => {
  return (
    <div className="loading-heart-view" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px'
    }}>
      <div>Loading...</div>
    </div>
  );
};

export default LoadingHeartView;
