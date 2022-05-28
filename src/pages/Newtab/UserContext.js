import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { firebaseApp } from './firebase';
const User = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  // Auth instance for the current firebaseApp
  const auth = getAuth(firebaseApp);
  setPersistence(auth, browserLocalPersistence);

  const init = () => {
    // Detect auth state
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log('Below User is logged in:');
        setUser(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        console.log('No user logged in!');
      }
    });
  };
  init();

  const initFirebaseApp = () => {
    // Detect auth state
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log('logged in!');
        console.log('current');
        console.log(user);
        console.log(user.token);
        setLoggedIn(true);
      } else {
        console.log('No user');
        startSignIn();
      }
    });
  };

  /**
   * Starts the sign-in process.
   */
  const startSignIn = () => {
    console.log('started SignIn');
    //https://firebase.google.com/docs/auth/web/manage-users
    const user = auth.currentUser;
    if (user) {
      console.log('current2');
      console.log(user);
      auth.signOut();
    } else {
      console.log('proceed');
      startAuth(true);
    }
  };

  function signOut() {
    if (user) {
      console.log('signing out');
      auth.signOut();
      setLoggedIn(false);
    }
  }

  const startAuth = (interactive) => {
    console.log('Auth trying');
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      //Token:  This requests an OAuth token from the Chrome Identity API.
      if (chrome.runtime.lastError && !interactive) {
        console.log('It was not possible to get a token programmatically.');
      } else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (token) {
        // Follows: https://firebase.google.com/docs/auth/web/google-signin
        // Authorize Firebase with the OAuth Access Token.
        // console.log("TOKEN:")
        // console.log(token)
        // Builds Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(null, token);
        signInWithCredential(auth, credential)
          .then((result) => {
            console.log('Success!!!');
            console.log(result);
            setLoggedIn(true);
          })
          .catch((error) => {
            // You can handle errors here
            console.log(error);
          });
      } else {
        console.error('The OAuth token was null');
      }
    });
  };

  useEffect(() => {
    user && localStorage.setItem('user', user);
  }, [user]);

  return (
    <User.Provider
      value={{
        user,
        setUser,
        initFirebaseApp,
        loggedIn,
        setLoggedIn,
        signOut,
        open,
        setOpen,
      }}
    >
      {children}
    </User.Provider>
  );
};
export const UserState = () => {
  return useContext(User);
};
export default UserContext;
