import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    
      return (
        <div className="relative h-screen bg-gray-400">
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md mx-auto bg-white rounded shadow-lg">
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">T_TRACKER</h1>
            <LoginForm />

            <p className="mt-4 text-gray-600">
            Don't have an account? <Link to="/create-account" className="text-blue-500">Create Account</Link>
          </p>
          </div>
          
        </div>
        </div>
        </div>
      );
};

export default LoginPage;
