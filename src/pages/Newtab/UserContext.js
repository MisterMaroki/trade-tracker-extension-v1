import React, { createContext, useContext, useState } from 'react';
const User = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};
export const UserState = () => {
  return useContext(User);
};
export default UserContext;
