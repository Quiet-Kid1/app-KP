// import express from 'express';
// import AsyncHandler from 'express-async-handler';
// const router = express.Router();
// import wargaModel from '../models/wargaModel.js';

// // fetch all products
// // route GET /api/products (coba cek server.js agar lebih jelas)
// router.get(
//   '/',
//   AsyncHandler(async (req, res) => {
//     const wargas = await wargaModel.find({});
//     res.json(wargas);
//   })
// );

// // fetch 1 product
// // route GET /api/products/:id (coba cek server.js agar lebih jelas)
// router.get(
//   '/:id',
//   AsyncHandler(async (req, res) => {
//     const warga = await wargaModel.findById(req.params.id);

//     if (warga) {
//       res.json(warga);
//     } else {
//       res.status(404);
//       throw new Error('not found');
//     }
//   })
// );

// export default router;
