import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBvu2XxIUjdFxI4j6Zr8y-WYjB3OLjO5vU",
  authDomain: "cryptofox.firebaseapp.com",
  databaseURL: "https://cryptofox.firebaseio.com",
  projectId: "cryptofox",
  storageBucket: "cryptofox.appspot.com",
  messagingSenderId: "647762671215",
  appID: "cryptofox",
}

firebase.initializeApp(config);

export const clientAuth = firebase.auth();

export default { clientAuth };