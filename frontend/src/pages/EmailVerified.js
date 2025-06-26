import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EmailVerified = () => {
  const location = useLocation();
  const [para , setPara] = useState('');
  const [heading, setHeading] = useState('Email Verified!');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('error') === 'already_verified') {
      setPara('⚠️ Your email is already verified. You can log in now.');
      setHeading('Email Already Verified');
    } else if (query.get('error') === 'invalid_token') {
      setPara('❌ The verification link is invalid or has expired. Please request a new verification email.');
      setHeading('Invalid Verification Link');
    } else {
      setPara('✅ Your account is now verified. You can log in confidently.');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-center" style={{ backgroundImage: "url('/assets/images/trust-bg.jpg')" }}>
      <div className="bg-white p-4 rounded-form shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="mb-4">{para}</p>
        <Link to="/auth" className="mybtn">Go to Login Page</Link>
      </div>
    </div>
  );
};

export default EmailVerified;