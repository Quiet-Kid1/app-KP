import mongoose from 'mongoose';

const wargaSchema = mongoose.Schema(
  {
    no_ktp: {
      type: String,
      required: true,
      unique: true,
    },
    no_keluarga: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Keluarga',
    },
    nama: {
      type: String,
      required: true,
    },
    agama: {
      type: String,
      required: true,
    },
    t_lahir: {
      type: String,
      required: true,
    },
    tanggal_lahir: {
      type: Date,
      required: true,
    },
    j_kelamin: {
      type: String,
      required: true,
    },
    lingkungan: {
      type: String,
      required: true,
    },
    gol_darah: {
      type: String,
      required: true,
    },
    w_negara: {
      type: String,
      required: true,
    },
    pendidikan: {
      type: String,
      required: true,
    },
    pekerjaan: {
      type: String,
      required: true,
    },
    s_nikah: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Warga = mongoose.model('Warga', wargaSchema);

export default Warga;
