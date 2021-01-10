import express from 'express';
import AsyncHandler from 'express-async-handler';
const router = express.Router();
import Post from '../models/postModel.js';

// fetch all post
// route GET /api/products (coba cek server.js agar lebih jelas)
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const posts = await Post.find({ ...keyword }).sort({ _id: -1 });

    res.json(posts);
  })
);

router.get(
  '/admin',
  AsyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const posts = await Post.find({ ...keyword })
      .sort({ _id: -1 })
      .limit(5);
    res.json(posts);
  })
);

// fetch 1 post
// route GET /api/post/:id (coba cek server.js agar lebih jelas)
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

// create 1 post
// route GET /api/products/:id (coba cek server.js agar lebih jelas)
router.post(
  '/',
  AsyncHandler(async (req, res) => {
    const { title, description, image } = req.body;

    const post = new Post({
      title,
      description,
      image,
    });

    const createdPost = await post.save();

    res.json(createdPost);
  })
);

//delete 1 post
router.delete(
  '/:id',
  AsyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.remove();
      res.json({ message: 'data post dihapus' });
    } else {
      res.json({ message: 'error, post tidak ditemukan' });
    }
  })
);

//PUT update 1 keluarga
router.put(
  '/:id',
  AsyncHandler(async (req, res) => {
    const { title, description, image } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
      (post.title = title),
        (post.description = description),
        (post.image = image);
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.json('data post tidak ditemukan');
    }
  })
);

export default router;
