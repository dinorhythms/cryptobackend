import { https } from 'firebase-functions';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/hello-world', (req, res) => {
  res.send('Hello from firebase ES6 function');
})

export const api = https.onRequest(app);