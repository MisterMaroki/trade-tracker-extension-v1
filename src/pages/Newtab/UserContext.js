import React, { createContext, useContext, useEffect, useState } from 'react';
const User = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  useEffect(() => {
    user && localStorage.setItem('user', user);
  }, [user]);

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};
export const UserState = () => {
  return useContext(User);
};
export default UserContext;
