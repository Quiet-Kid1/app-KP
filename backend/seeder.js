import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Posts from './data/Posts.js';
import ListWarga from './data/ListWarga.js';
import ListKeluarga from './data/ListKeluarga.js';
import users from './data/users.js';

import Post from './models/postModel.js';
import keluargaModel from './models/keluargaModel.js';
import userModel from './models/userModel.js';
import wargaModel from './models/wargaModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await keluargaModel.deleteMany();
    await userModel.deleteMany();
    await wargaModel.deleteMany();

    await Post.insertMany(Posts);
    const dataKel = await keluargaModel.insertMany(ListKeluarga);
    await userModel.insertMany(users);

    const keluarga = dataKel[0]._id;

    const sampleWarga = ListWarga.map(warga => {
      return { ...warga, no_keluarga: keluarga };
    });

    await wargaModel.insertMany(sampleWarga);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await keluargaModel.deleteMany();
    await userModel.deleteMany();
    await wargaModel.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
