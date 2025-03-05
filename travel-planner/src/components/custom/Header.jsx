import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginDialog from './LoginDialog';

const Header = () => {
  const { isLoggedIn, showDialog, userName, handleLogin, handleLogout, handleShowDialog, setShowDialog } = useAuth();

  return (
    <header className="flex justify-between items-center p-6 sm:p-8 md:p-10">
      <div className="text-white text-lg font-semibold">
        <h1 className="text-3xl md:text-4xl font-bold">Nomadica</h1>
        <p className="text-sm md:text-base">Your Adventure, Perfected by AI</p>
      </div>
      {isLoggedIn ? (
        <div className="relative">
          <button
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition"
            onClick={() => setShowDialog(!showDialog)}
          >
            {userName}
          </button>
          {showDialog && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          onClick={handleShowDialog}
        >
          Sign In
        </button>
      )}
      {showDialog && !isLoggedIn && (
        <LoginDialog onClose={() => setShowDialog(false)} onLogin={handleLogin} />
      )}
    </header>
  );
};

export default Header;