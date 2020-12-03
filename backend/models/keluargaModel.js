import mongoose from 'mongoose';

const keluargaSchema = mongoose.Schema(
  {
    no_kk: {
      type: String,
      required: true,
      unique: true,
    },
    nama_kepala: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    RT: {
      type: String,
      default: '-',
    },
    RW: {
      type: String,
      required: true,
    },
    kelurahan: {
      type: String,
      required: true,
    },
    kecamatan: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true,
    },
    kode_pos: {
      type: String,
      required: true,
      default: 0,
    },
    Provinsi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Keluarga = mongoose.model('Keluarga', keluargaSchema);

export default Keluarga;
