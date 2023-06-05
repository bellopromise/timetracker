import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from './mutations';
import { UserContext } from './UserContext';


const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
  
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
      onCompleted: (data) => {
        const { user, token } = data.login;
        updateUser(user);

        localStorage.setItem('token', token);
        navigate('/'); // Redirect to the welcome page after successful login
      },
      onError: (error) => {
        setError(error.message); // Set the error message if login fails
      }
    });
  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        await login({
          variables: {
            username,
            password
          }
        });
      } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please check your username and password.'); // Set a generic error message
      }
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Login your details</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md px-3 py-2 mt-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 mt-1 w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
