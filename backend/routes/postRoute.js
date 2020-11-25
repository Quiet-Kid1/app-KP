import express from 'express';
import AsyncHandler from 'express-async-handler';
const router = express.Router();
import Post from '../models/postModel.js';

// fetch all products
// route GET /api/products (coba cek server.js agar lebih jelas)
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
  })
);

// fetch 1 product
// route GET /api/products/:id (coba cek server.js agar lebih jelas)
router.get(
  '/:id',
  AsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  })
);

export default router;
