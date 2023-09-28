import { initializeApp } from "firebase/app";
import { getAuth, Auth   } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBw1YtdqzGuLaijO9LV6xusMZvRrywWdX0",
  authDomain: "logindashboard-8a1d4.firebaseapp.com",
  projectId: "logindashboard-8a1d4",
  storageBucket: "logindashboard-8a1d4.appspot.com",
  messagingSenderId: "1035703390531",
  appId: "1:1035703390531:web:8ca10b417a6e40d4c25ff6",
  measurementId: "G-DF6H6W84S5"
};


const app = initializeApp(firebaseConfig);


const auth: Auth = getAuth(app);
 const db = getDatabase(app);
const firestore = getFirestore(app); 
export { auth, db, firestore };
export default app;
