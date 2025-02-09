// SuccessPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ color: '#4CAF50' }}>Payment Successful!</h1>
        <p>Your payment was successfully processed. Thank you for your purchase service!</p>
        <div style={{ marginTop: '20px' }}>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#FF9933',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default SuccessPage;
