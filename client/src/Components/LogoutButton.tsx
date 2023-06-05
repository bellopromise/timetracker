import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogout = () => {
    // Perform logout actions
    localStorage.removeItem('token'); // Remove the token from local storage
    updateUser(null); // Reset any other user-related state if needed

    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-blue-500 text-white rounded-md px-4 py-2">
      Logout
    </button>
  );
};

export default LogoutButton;
