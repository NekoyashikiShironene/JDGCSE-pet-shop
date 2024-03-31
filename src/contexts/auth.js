import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });
  const [account, setAccount] = useState(() => {
    return JSON.parse(localStorage.getItem('account')) || null;
  });

  useEffect(() => {
    console.log("Effect is used");
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Update local storage when account changes
  useEffect(() => {
    localStorage.setItem('account', JSON.stringify(account));
  }, [account]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
