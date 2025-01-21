// src/pages/AccessDenied.tsx
import React from 'react';

const AccessDenied = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Acesso Denied</h2>
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        <a href="#/plans" className="text-blue-500 hover:underline">Back to Plans</a>
      </div>
    </div>
  );
};

export default AccessDenied;
