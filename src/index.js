import { https } from 'firebase-functions';
import express from 'express';
import './config/env';
import routes from './routes';

const app = express();
const router = express.Router();
routes(router);

app.use(express.json());

app.use('/v1', router);

app.get('/', (req, res) => {
  res.send('Welcome to CryptoCurrency Backend');
})

export const api = https.onRequest(app);
