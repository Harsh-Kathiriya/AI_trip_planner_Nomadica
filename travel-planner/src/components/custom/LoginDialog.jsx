import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';

const LoginDialog = ({ onClose, onLogin }) => {
  const handleSuccess = (response) => {
    // Extract user profile information from the response
    const credential = response.credential;
    const payload = JSON.parse(atob(credential.split('.')[1]));

    const userName = payload.name;
    onLogin(userName);
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-70 fixed inset-0"></div>
      <div className="relative bg-gray-800 rounded-lg shadow-lg p-8 w-11/12 md:w-1/3 max-w-md z-10">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-white">Login with Google</h2>
        <p className="mb-4 text-gray-300">To create a trip, please log in with your Google account.</p>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          render={(renderProps) => (
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full hover:opacity-90 transition"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default LoginDialog;