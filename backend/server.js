import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';

import postRoute from './routes/postRoute.js';

const app = express();
dotenv.config();

ConnectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
