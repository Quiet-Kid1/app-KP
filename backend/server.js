import express from 'express';
import dotenv from 'dotenv';
import AsyncHandler from 'express-async-handler';
import ConnectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import postRoute from './routes/postRoute.js';
import usersRoute from './routes/usersRoute.js';

import wargaModel from './models/wargaModel.js';
import keluargaModel from './models/keluargaModel.js';

const app = express();

// body-parser supaya menerima post request dari client/url
app.use(express.json());
dotenv.config();

ConnectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

//post route
app.use('/api/posts', postRoute);
app.use('/api/users', usersRoute);

//list warga route
app.get(
  '/api/listwarga',
  AsyncHandler(async (req, res) => {
    const wargas = await wargaModel.find({}).populate('no_keluarga', 'no_kk');

    res.json(wargas);
  })
);

//list detail keluarga
app.get(
  '/api/detailwarga/:id',
  AsyncHandler(async (req, res) => {
    const detailWarga = await wargaModel
      .findById(req.params.id)
      .populate('no_keluarga', 'no_kk alamat RT RW kecamatan');

    res.json(detailWarga);
  })
);

app.get(
  '/api/keluargawarga/:id',
  AsyncHandler(async (req, res) => {
    const warga = await wargaModel.find({ no_keluarga: req.params.id });
    const keluarga = await keluargaModel.findById(req.params.id);

    const KK = { keluarga, saudara: warga };

    if (KK) {
      res.json(KK);
    } else {
      res.status(404);
      throw new Error('not found');
    }
  })
);

// list keluarga route
app.get(
  '/api/listkeluarga',
  AsyncHandler(async (req, res) => {
    const keluargas = await keluargaModel.find({});
    res.json(keluargas);
  })
);

app.get(
  '/api/listkeluarga/:id',
  AsyncHandler(async (req, res) => {
    const keluarga = await keluargaModel.findById(req.params.id);

    if (keluarga) {
      res.json(keluarga);
    } else {
      res.status(404);
      throw new Error('not found');
    }
  })
);

//error handling post
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
