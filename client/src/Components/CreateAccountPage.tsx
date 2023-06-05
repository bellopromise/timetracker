import { Link } from 'react-router-dom';
import CreateAccountForm from './CreateAccountForm';

const CreateAccountPage: React.FC = () => {
  return (
    <div className="relative h-screen bg-gray-400">
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">T_TRACKER</h1>
        <CreateAccountForm />

      <p className="mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
    </div>
    </div>
  );
};

export default CreateAccountPage;
