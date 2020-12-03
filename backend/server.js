import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AsyncHandler from 'express-async-handler';
import ConnectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import postRoute from './routes/postRoute.js';
import usersRoute from './routes/usersRoute.js';
import uploadsRoute from './routes/uploadsRoute.js';

import wargaModel from './models/wargaModel.js';
import keluargaModel from './models/keluargaModel.js';
import Warga from './models/wargaModel.js';
import Keluarga from './models/keluargaModel.js';

const app = express();

// body-parser supaya menerima post request dari client/url
app.use(express.json());
dotenv.config();

ConnectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/posts', postRoute);
app.use('/api/users', usersRoute);
app.use('/api/upload', uploadsRoute);

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//list warga route
app.get(
  '/api/listwarga',
  AsyncHandler(async (req, res) => {
    // const wargas = await wargaModel.find({}).populate('no_keluarga', 'no_kk');

    // res.json(wargas);

    const wargas = await wargaModel.aggregate([
      {
        $project: {
          no_ktp: '$no_ktp',
          no_keluarga: '$no_keluarga',
          tanggal_lahir: '$tanggal_lahir',
          nama: '$nama',
          agama: '$agama',
          t_lahir: '$t_lahir',
          j_kelamin: '$j_kelamin',
          lingkungan: '$lingkungan',
          gol_darah: '$gol_darah',
          w_negara: '$w_negara',
          pendidikan: '$pendidikan',
          pekerjaan: '$pekerjaan',
          s_nikah: '$s_nikah',
          status: '$status',
          UmurWarga: {
            $floor: {
              $divide: [
                { $subtract: [new Date(), '$tanggal_lahir'] },
                365 * 24 * 60 * 60 * 1000,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'keluargas',
          localField: 'no_keluarga',
          foreignField: '_id',
          as: 'no_keluarga',
        },
      },
    ]);

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

//delete 1 warga
app.delete(
  '/api/listwarga/:id',
  AsyncHandler(async (req, res) => {
    const warga = await wargaModel.findById(req.params.id);

    if (warga) {
      await warga.remove();
      res.json({ message: 'data warga dihapus' });
    } else {
      res.json({ message: 'error, warga tidak ditemukan' });
    }
  })
);

//POST create 1 warga
app.post(
  '/api/listwarga',
  AsyncHandler(async (req, res) => {
    const {
      no_ktp,
      no_keluarga,
      nama,
      agama,
      t_lahir,
      tanggal_lahir,
      j_kelamin,
      lingkungan,
      gol_darah,
      w_negara,
      pendidikan,
      pekerjaan,
      s_nikah,
      status,
    } = req.body;

    const warga = new Warga({
      no_ktp,
      no_keluarga: mongoose.Types.ObjectId(no_keluarga),
      nama,
      agama,
      t_lahir,
      tanggal_lahir,
      j_kelamin,
      lingkungan,
      gol_darah,
      w_negara,
      pendidikan,
      pekerjaan,
      s_nikah,
      status,
    });

    const createdWarga = await warga.save();

    res.json(createdWarga);
  })
);

//PUT edit 1 warga
app.put(
  '/api/listwarga/:id',
  AsyncHandler(async (req, res) => {
    const {
      no_ktp,
      no_keluarga,
      nama,
      agama,
      t_lahir,
      tanggal_lahir,
      j_kelamin,
      lingkungan,
      gol_darah,
      w_negara,
      pendidikan,
      pekerjaan,
      s_nikah,
      status,
    } = req.body;

    const warga = await Warga.findById(req.params.id);

    if (warga) {
      (warga.nama = nama),
        (warga.no_ktp = no_ktp),
        (warga.no_keluarga = no_keluarga),
        (warga.agama = agama),
        (warga.t_lahir = t_lahir),
        (warga.tanggal_lahir = tanggal_lahir),
        (warga.j_kelamin = j_kelamin),
        (warga.lingkungan = lingkungan),
        (warga.gol_darah = gol_darah),
        (warga.w_negara = w_negara),
        (warga.pendidikan = pendidikan),
        (warga.pekerjaan = pekerjaan),
        (warga.s_nikah = s_nikah),
        (warga.status = status);

      const updatedWarga = await warga.save();
      res.json(updatedWarga);
    } else {
      res.json('data warga tidak ditemukan');
    }
  })
);

// GET semua warga yang sama keluarga
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

//POST create 1 keluarga
app.post(
  '/api/listkeluarga',
  AsyncHandler(async (req, res) => {
    const {
      no_kk,
      nama_kepala,
      alamat,
      kode_pos,
      RW,
      kelurahan,
      kecamatan,
      kota,
      Provinsi,
    } = req.body;

    const keluarga = new Keluarga({
      no_kk,
      nama_kepala,
      alamat,
      kode_pos,
      RW,
      kelurahan,
      kecamatan,
      kota,
      Provinsi,
    });

    const createdWarga = await keluarga.save();

    res.json(createdWarga);
  })
);

//DELETE   delete 1 keluarga
app.delete(
  '/api/listkeluarga/:id',
  AsyncHandler(async (req, res) => {
    const keluarga = await keluargaModel.findById(req.params.id);

    if (keluarga) {
      await keluarga.remove();
      res.json({ message: 'data keluarga dihapus' });
    } else {
      res.json({ message: 'error, keluarga tidak ditemukan' });
    }
  })
);

//PUT update 1 keluarga
app.put(
  '/api/listkeluarga/:id',
  AsyncHandler(async (req, res) => {
    const {
      no_kk,
      nama_kepala,
      alamat,
      kode_pos,
      RW,
      kelurahan,
      kecamatan,
      kota,
      Provinsi,
    } = req.body;

    const keluarga = await Keluarga.findById(req.params.id);

    if (keluarga) {
      (keluarga.no_kk = no_kk),
        (keluarga.nama_kepala = nama_kepala),
        (keluarga.alamat = alamat),
        (keluarga.kode_pos = kode_pos),
        (keluarga.RW = RW),
        (keluarga.kelurahan = kelurahan),
        (keluarga.kecamatan = kecamatan),
        (keluarga.kota = kota),
        (keluarga.Provinsi = Provinsi);
      const updatedKeluarga = await keluarga.save();
      res.json(updatedKeluarga);
    } else {
      res.json('data keluarga tidak ditemukan');
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
