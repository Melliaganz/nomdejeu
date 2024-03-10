import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC5Y_Lpb9OmD8WJvJYTtMR1Y_LITbulKmM",
  authDomain: "mellianjeux.firebaseapp.com",
  projectId: "mellianjeux",
  storageBucket: "mellianjeux.appspot.com",
  messagingSenderId: "95491340721",
  appId: "1:95491340721:web:9cb85de2b50b720805e590",
  measurementId: "G-EX510HMYFN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Use getDatabase to initialize the Realtime Database
const dbref = ref(db, 'server/saving-data/fireblog');


export { app };