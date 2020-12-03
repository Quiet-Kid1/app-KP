import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createWarga } from '../actions/wargaAction';
import { WARGA_CREATE_RESET } from '../constants/wargaConstants';

const DetailWarga = ({ history }) => {
  const dispatch = useDispatch();

  const [nama, setNama] = useState('');
  const [no_ktp, setNo_ktp] = useState('');
  const [no_keluarga, setNo_keluarga] = useState('');
  const [agama, setAgama] = useState('');
  const [t_lahir, setT_lahir] = useState('');
  const [tanggal_lahir, setTanggal_lahir] = useState(new Date());
  const [j_kelamin, setJ_kelamin] = useState('');
  const [lingkungan, setLingkungan] = useState('');
  const [gol_darah, setGol_darah] = useState('');
  const [w_negara, setW_negara] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [s_nikah, setS_nikah] = useState('');
  const [status, setStatus] = useState('');
  const [listKeluarga, setListKeluarga] = useState([]);

  //lihat dari store
  const wargaListDetails = useSelector(state => state.wargaListDetails);
  const { loading, error } = wargaListDetails;

  //lihat dari store
  const wargaCreate = useSelector(state => state.wargaCreate);
  const { success: successCreate } = wargaCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: WARGA_CREATE_RESET });
      history.push('/admin/listwarga');
    }
    const fetchKeluarga = async () => {
      const response = await axios.get('/api/listkeluarga');

      setListKeluarga(response.data);
    };
    fetchKeluarga();
  }, [dispatch, listKeluarga]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      createWarga({
        nama,
        no_ktp,
        no_keluarga,
        agama,
        t_lahir,
        tanggal_lahir: new Date(tanggal_lahir),
        j_kelamin,
        lingkungan,
        gol_darah,
        w_negara,
        pendidikan,
        pekerjaan,
        s_nikah,
        status,
      })
    );
  };

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Buat Data Warga</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={nama}
                onChange={e => setNama(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Nomor KTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter email"
                value={no_ktp}
                onChange={e => setNo_ktp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="agama">
              <Form.Label>Agama</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter password"
                value={agama}
                onChange={e => setAgama(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tLahir">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tempat Lahir"
                value={t_lahir}
                onChange={e => setT_lahir(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <DatePicker
                selected={tanggal_lahir}
                dateFormat="Pp"
                onChange={date => setTanggal_lahir(date)}
              />
            </Form.Group>
            <Form.Group controlId="JenisKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={j_kelamin}
                onChange={e => setJ_kelamin(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lingkungan">
              <Form.Label>Lingkungan</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={lingkungan}
                onChange={e => setLingkungan(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="gol_darah">
              <Form.Label>Golongan Darah</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={gol_darah}
                onChange={e => setGol_darah(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="w_negara">
              <Form.Label>Warga Negara</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Warga Negara"
                value={w_negara}
                onChange={e => setW_negara(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pendidikan">
              <Form.Label>Pendidikan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Pendidikan"
                value={pendidikan}
                onChange={e => setPendidikan(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pekerjaan">
              <Form.Label>Pekerjaan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Pekerjaan Warga"
                value={pekerjaan}
                onChange={e => setPekerjaan(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="s_nikah">
              <Form.Label>Status Nikah</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={s_nikah}
                onChange={e => setS_nikah(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={status}
                onChange={e => setStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="keluarga">
              <Form.Label>Keluarga</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={no_keluarga}
                onChange={e => setNo_keluarga(e.target.value)}
              >
                {listKeluarga.map(keluarga => (
                  <option value={keluarga._id}>{keluarga.no_kk}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Buat
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default DetailWarga;
