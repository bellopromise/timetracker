import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccountPage from './Components/CreateAccountPage';
import LoginPage from './Components/LoginPage';
import PrivateRoute from './Components/PrivateRoute';
import WelcomePage from './Components/WelcomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/login" element={<LoginPage/>} />
        <Route path="/create-account" element={<CreateAccountPage/>} />
        
        <Route path="/" element={<PrivateRoute><WelcomePage/></PrivateRoute>} />
        
      </Routes>
    </Router>
  );
};

export default App;
