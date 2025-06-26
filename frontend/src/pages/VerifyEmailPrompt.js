import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailPrompt = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-center " style={{ backgroundImage: "url('/assets/images/trust-bg.jpg')" }}>
      <div className="bg-white p-4 rounded-form shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-4">Please check your email (including spam/junk) for a verification link to activate your account.</p>
        <Link to="/auth" className="mybtn">Back to Login</Link>
      </div>
    </div>
  );
};

export default VerifyEmailPrompt;