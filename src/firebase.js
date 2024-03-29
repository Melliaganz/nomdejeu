// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC5Y_Lpb9OmD8WJvJYTtMR1Y_LITbulKmM',
  authDomain: 'mellianjeux.firebaseapp.com',
  projectId: 'mellianjeux',
  storageBucket: 'mellianjeux.appspot.com',
  messagingSenderId: '95491340721',
  appId: '1:95491340721:web:9cb85de2b50b720805e590',
  measurementId: 'G-EX510HMYFN',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database, ref }; // Include 'ref' for direct usage in components
