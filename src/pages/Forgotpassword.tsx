import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { motion } from 'framer-motion';  // Importa o framer-motion

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`https://backend-vip.vercel.app/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setError('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Forgot Password</h2>
        
        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Animação no botão */}
          <motion.button
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            type="submit"
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}    
          >
            Send Reset Link
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
