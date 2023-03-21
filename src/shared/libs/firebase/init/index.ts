import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;

export const initializeAPI = (): FirebaseApp => {
  firebaseApp = initializeApp({
    apiKey: 'AIzaSyDiW66AtubqOlBelvfKfuxb5pkcQCCBNr0',
    authDomain: 'kanban-d9b79.firebaseapp.com',
    projectId: 'kanban-d9b79',
    storageBucket: 'kanban-d9b79.appspot.com',
    messagingSenderId: '634127650141',
    appId: '1:634127650141:web:1e87f64570887cfb046cb4',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);

  return firebaseApp;
};
