import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve login state from local storage on initialization
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setShowDialog(false);
    // Save login state to local storage
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    // Remove login state from local storage
    localStorage.removeItem('userName');
  };

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  return {
    isLoggedIn,
    showDialog,
    userName,
    handleLogin,
    handleLogout,
    handleShowDialog,
    setShowDialog
  };
};