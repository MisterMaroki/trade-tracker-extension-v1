import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
const User = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  // Auth instance for the current firebaseApp
  setPersistence(auth, browserLocalPersistence);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const coinsRef = doc(db, 'watchlist', user?.uid);

      var unsubscribe = onSnapshot(coinsRef, (coin) => {
        if (coin.exists) {
          setWatchlist(coin.data().coins);
        } else {
          console.log('Nothing in the watchlist.');
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const init = () => {
    // Detect auth state
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log('Below User is logged in:');
        console.log(user);
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
      setWatchlist([]);
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
        const credential = GoogleAuthProvider.credential(null, token);
        signInWithCredential(auth, credential)
          .then((result) => {
            console.log('Success!!!');
            console.log(result);
            setLoggedIn(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.error('The OAuth token was null');
      }
    });
  };

  const addToWatchlist = async (coin, row) => {
    const coinRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist
          ? [...watchlist, { id: coin.id, price: row.current_price }]
          : [{ id: coin.id, price: row.current_price }],
      });
      setAlert({
        open: true,
        message: `${coin.name} has been added to your watchlist.`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((x) => x.id !== coin?.id),
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} has been removed from your watchlist.`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

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
        alert,
        setAlert,
        watchlist,
        setWatchlist,
        addToWatchlist,
        removeFromWatchlist,
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
