import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listKeluargaDetails, updateKeluarga } from '../actions/keluargaAction';
import {
  KELUARGA_UPDATE_RESET,
  KELUARGA_DETAILS_RESET,
} from '../constants/keluargaConstants';

const EditKeluarga = ({ history, match }) => {
  const keluargaId = match.params.id;
  const dispatch = useDispatch();

  const [no_kk, setNo_kk] = useState('');
  const [nama_kepala, setNama_kepala] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kode_pos, setKode_pos] = useState('');
  const [RW, setRW] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kota, setKota] = useState('');
  const [Provinsi, setProvinsi] = useState('');

  //lihat dari store
  const keluargaUpdate = useSelector(state => state.keluargaUpdate);
  const { error, success: successUpdate } = keluargaUpdate;

  //lihat dari store
  const keluargaListDetails = useSelector(state => state.keluargaListDetails);
  const { keluarga: detailKeluarga } = keluargaListDetails;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: KELUARGA_UPDATE_RESET });
      dispatch({ type: KELUARGA_DETAILS_RESET });
      history.push('/admin/listkeluarga');
    } else {
      if (
        detailKeluarga.length === 0 ||
        detailKeluarga.keluarga._id !== keluargaId
      ) {
        dispatch(listKeluargaDetails(keluargaId));
      } else {
        setNo_kk(detailKeluarga.keluarga.no_kk);
        setNama_kepala(detailKeluarga.keluarga.nama_kepala);
        setAlamat(detailKeluarga.keluarga.alamat);
        setKode_pos(detailKeluarga.keluarga.kode_pos);
        setRW(detailKeluarga.keluarga.RW);
        setKelurahan(detailKeluarga.keluarga.kelurahan);
        setKecamatan(detailKeluarga.keluarga.kecamatan);
        setKota(detailKeluarga.keluarga.kota);
        setProvinsi(detailKeluarga.keluarga.Provinsi);
      }
    }
  }, [dispatch, successUpdate, match, detailKeluarga, keluargaId]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      updateKeluarga({
        _id: keluargaId,
        no_kk,
        nama_kepala,
        alamat,
        kode_pos,
        RW,
        kelurahan,
        kecamatan,
        kota,
        Provinsi,
      })
    );
  };

  return (
    <FormContainer>
      {error && (
        <Message variant="danger">
          Keluarga dengan Nomor KK ini telah ada
        </Message>
      )}
      {detailKeluarga.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h3>Ubah Data Keluarga</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="no_kk">
              <Form.Label>Nomor KK</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor KK"
                value={no_kk}
                onChange={e => setNo_kk(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Kepala Rumah Tangga</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kepala Rumah Tangga"
                value={nama_kepala}
                onChange={e => setNama_kepala(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            {!userInfo.pala ? (
              <Form.Group controlId="alamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                >
                  <option value="Lingkungan I">Lingkungan I</option>
                  <option value="Lingkungan II">Lingkungan II</option>
                  <option value="Lingkungan III">Lingkungan III</option>
                  <option value="Lingkungan IV">Lingkungan IV</option>
                  <option value="Lingkungan V">Lingkungan V</option>
                  <option value="Lingkungan VI">Lingkungan VI</option>
                  <option value="Lingkungan VII">Lingkungan VII</option>
                  <option value="Lingkungan VII">Lingkungan VII</option>
                  <option value="Lingkungan XI">Lingkungan XI</option>
                  <option value="Lingkungan X">Lingkungan X</option>
                  <option value="Lingkungan XI">Lingkungan XI</option>
                </Form.Control>
              </Form.Group>
            ) : (
              <Form.Group controlId="alamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Alamat"
                  value={userInfo.pala}
                  disabled
                ></Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="kode_pos">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kode Pos"
                value={kode_pos}
                onChange={e => setKode_pos(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="RW">
              <Form.Label>RW</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan RW"
                value={RW}
                onChange={e => setRW(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kelurahan">
              <Form.Label>Kelurahan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kelurahan"
                value={kelurahan}
                onChange={e => setKelurahan(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kecamatan">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kecamatan"
                value={kecamatan}
                onChange={e => setKecamatan(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kota">
              <Form.Label>Kota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Kota"
                value={kota}
                onChange={e => setKota(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Provinsi">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Provinsi"
                value={Provinsi}
                onChange={e => setProvinsi(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Ubah
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default EditKeluarga;
