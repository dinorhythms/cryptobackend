import * as admin from 'firebase-admin';
import serviceAccount from '../../service-account/cryptofox-firebase-adminsdk-3qiy0-797a355281.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

export default { db };