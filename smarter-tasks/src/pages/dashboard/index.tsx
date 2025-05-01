import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  // If no user data is found, redirect to the signin page
  if (!userData || !userData.name || !userData.email) {
    navigate('/signin');
    return null; // Render nothing while redirecting
  }

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    // Redirect to login page (Signin page)
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        <div className="bg-white p-6 rounded shadow-md">
          <p className="text-lg font-semibold text-gray-700">Welcome, {userData.name}!</p>
          <p className="text-sm text-gray-600">Email: {userData.email}</p>
        </div>

        <button
          id="logout-link"
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
