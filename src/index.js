import { https } from 'firebase-functions';
import express from 'express';
import trimmer from 'trim-request-body';
import cors from 'cors';
import './config/env';
import routes from './routes';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const router = express.Router();
routes(router);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(trimmer);

app.use('/v1', router);

app.get('/', (req, res) => {
  res.send('Welcome to CryptoCurrency Backend');
})

// Handle routes not found
app.use('*', (req, res) => response(res, 404, 'error', {
  message: 'Not found',
}));

export const api = https.onRequest(app);
