import { ApolloError, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { CREATE_USER_MUTATION } from './mutations';
import { UserContext } from './UserContext';

const CreateAccountForm: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform input validations
    if (!name || !username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validation passed, proceed with account creation logic
    setError('');
    // Handle account creation logic here
   try {
    const { data } = await createUser({
      variables: {
        name,
        username,
        password,
      },
    });

    if (data.createUser) {
        const { user, token } = data.createUser;
        updateUser(user);
        
        localStorage.setItem('token', token);
        navigate('/'); // Redirect to the welcome page after successful login
      } else {
        setError('Account creation failed. Please try again.');
      }
  
    } catch (error: unknown) {
        console.error('Account creation failed:', error);
        if (error instanceof ApolloError) {
          setError(error.message);
        } else {
          setError('Account creation failed. Please try again.');
        }
      }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create an account</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleCreateAccount}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
