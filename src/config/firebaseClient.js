import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "cryptofox.firebaseapp.com",
  databaseURL: "https://cryptofox.firebaseio.com",
  projectId: "cryptofox",
  storageBucket: "cryptofox.appspot.com",
  messagingSenderId: process.env.SENDER_ID,
  appID: "cryptofox",
}

firebase.initializeApp(config);

export const clientAuth = firebase.auth();

export default { clientAuth };