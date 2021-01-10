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

// grafik chart golongan pekerjaan
app.get(
  '/api/grafikkelamin',
  AsyncHandler(async (req, res) => {
    const grafikKelamin = await wargaModel.aggregate([
      { $unwind: '$j_kelamin' },
      { $sortByCount: '$j_kelamin' },
    ]);

    res.json(grafikKelamin);
  })
);

// grafik chart agama
app.get(
  '/api/grafikagama',
  AsyncHandler(async (req, res) => {
    const grafikAgama = await wargaModel.aggregate([
      { $unwind: '$agama' },
      { $sortByCount: '$agama' },
    ]);

    res.json(grafikAgama);
  })
);

// grafik chart pendidikan
app.get(
  '/api/grafikpendidikan',
  AsyncHandler(async (req, res) => {
    const grafikAgama = await wargaModel.aggregate([
      { $unwind: '$pendidikan' },
      { $sortByCount: '$pendidikan' },
    ]);

    res.json(grafikAgama);
  })
);

// grafik chart pekerjaan
app.get(
  '/api/grafikpekerjaan',
  AsyncHandler(async (req, res) => {
    const grafikAgama = await wargaModel.aggregate([
      { $unwind: '$pekerjaan' },
      { $sortByCount: '$pekerjaan' },
    ]);

    res.json(grafikAgama);
  })
);

// grafik chart golongan nikah
app.get(
  '/api/grafiknikah',
  AsyncHandler(async (req, res) => {
    const grafikNikah = await wargaModel.aggregate([
      { $unwind: '$s_nikah' },
      { $sortByCount: '$s_nikah' },
    ]);

    res.json(grafikNikah);
  })
);

// grafik chart golongan darah
app.get(
  '/api/grafikgoldar',
  AsyncHandler(async (req, res) => {
    const grafikNikah = await wargaModel.aggregate([
      { $unwind: '$gol_darah' },
      { $sortByCount: '$gol_darah' },
    ]);

    res.json(grafikNikah);
  })
);

// grafik chart golongan umur
app.get(
  '/api/grafikumur',
  AsyncHandler(async (req, res) => {
    const wargas = await wargaModel.aggregate([
      {
        $project: {
          age: {
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
        $group: {
          _id: {
            $concat: [
              { $cond: [{ $lte: ['$age', 0] }, 'Tidak diketahui', ''] },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 1] }, { $lte: ['$age', 5] }] },
                  '1 - 5 Tahun',
                  '',
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 6] }, { $lte: ['$age', 11] }] },
                  '6 - 11 Tahun',
                  '',
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 12] }, { $lte: ['$age', 25] }] },
                  '12 - 25 Tahun',
                  '',
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 26] }, { $lte: ['$age', 45] }] },
                  '26 - 45 Tahun',
                  '',
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 46] }, { $lte: ['$age', 65] }] },
                  '46 - 65 Tahun',
                  '',
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ['$age', 66] }] },
                  '66 - atas Tahun',
                  '',
                ],
              },
            ],
          },
          penduduk: { $sum: 1 },
        },
      },
      { $project: { _id: 0, umur: '$_id', penduduk: 1 } },
    ]);

    res.json(wargas);
  })
);

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
