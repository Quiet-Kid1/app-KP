import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Merliah Humambi',
    email: 'merliah@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lurah',
  },
  {
    name: 'Rini Kapantow',
    email: 'rini@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Sekertaris',
  },
  {
    name: 'Pala Lingkungan I',
    email: 'pala1@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan I',
  },
  {
    name: 'Pala Lingkungan II',
    email: 'pala2@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan II',
  },
  {
    name: 'Pala Lingkungan III',
    email: 'pala3@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan III',
  },
  {
    name: 'Pala Lingkungan IV',
    email: 'pala4@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan IV',
  },
  {
    name: 'Pala Lingkungan V',
    email: 'pala5@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan V',
  },
  {
    name: 'Pala Lingkungan VI',
    email: 'pala6@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan VI',
  },
  {
    name: 'Pala Lingkungan VII',
    email: 'pala7@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan VII',
  },
  {
    name: 'Pala Lingkungan VIII',
    email: 'pala8@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan VIII',
  },
  {
    name: 'Pala Lingkungan IX',
    email: 'pala9@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan IX',
  },
  {
    name: 'Pala Lingkungan X',
    email: 'pala10@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan X',
  },
  {
    name: 'Pala Lingkungan XI',
    email: 'pala11@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan XI',
  },
  {
    name: 'Pala Lingkungan XII',
    email: 'pala12@example.com',
    password: bcrypt.hashSync('12345', 10),
    role: 'Lingkungan',
    pala: 'Lingkungan XII',
  },
];

export default users;
