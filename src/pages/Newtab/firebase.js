// import { initializeApp } from 'firebase/app';

// const firebaseApp = initializeApp(firebaseConfig);

// // const auth = getAuth(firebaseApp);
// // const db = getFirestore(firebaseApp);

// export { firebaseApp };
import firebaseConfig from '../Content/config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database

export { auth, db, firebaseApp };
