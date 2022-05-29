import { Avatar } from '@mui/material';
import React from 'react';
import { ColorButton } from '../../styles/themeVariables';
import { UserState } from '../../UserContext';

const AuthModal = () => {
  const { user, initFirebaseApp, loggedIn, signOut } = UserState();

  return !loggedIn ? (
    // <h6
    //   style={{ cursor: 'pointer', color: currentColor }}
    //   onClick={() => {
    //     setId('');
    //     setShowTrades(false);
    //   }}
    // >
    //   <span>
    //     {user.charAt(0).toUpperCase() + user.slice(1)}'s Dashboard
    //   </span>
    // </h6>

    <ColorButton onClick={initFirebaseApp}>Login</ColorButton>
  ) : (
    <Avatar
      src={user?.photoURL}
      alt="user avatar"
      style={{ background: 'none' }}
      onClick={() => signOut()}
    />
  );
};

export default AuthModal;
