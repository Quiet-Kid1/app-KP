import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Posts from './data/Posts.js';

import Post from './models/postModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();

    await Post.insertMany(Posts);

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
