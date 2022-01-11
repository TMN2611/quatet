import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDw5hwuybCA19Cc5Rc3VoVzW_hCA8-FQbM',
  authDomain: 'quatet-b5581.firebaseapp.com',
  projectId: 'quatet-b5581',
  storageBucket: 'quatet-b5581.appspot.com',
  messagingSenderId: '57446998532',
  appId: '1:57446998532:web:fdac2689b1d25d8fae0b51',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
