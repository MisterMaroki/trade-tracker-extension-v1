import { initializeApp } from 'firebase/app';

import firebaseConfig from '../Content/config/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);

export { firebaseApp };
