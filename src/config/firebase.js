import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDw5hwuybCA19Cc5Rc3VoVzW_hCA8-FQbM',
  authDomain: 'quatet-b5581.firebaseapp.com',
  projectId: 'quatet-b5581',
  storageBucket: 'quatet-b5581.appspot.com',
  messagingSenderId: '57446998532',
  appId: '1:57446998532:web:fdac2689b1d25d8fae0b51',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// database

const db = getFirestore();
export default db;
