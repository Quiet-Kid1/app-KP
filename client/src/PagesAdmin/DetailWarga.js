import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listwargaDetails } from '../actions/wargaAction';

const DetailWarga = ({ match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [noKtp, setNoKtp] = useState('');
  const [agama, setAgama] = useState('');
  const [tLahir, setTLahir] = useState('');

  //lihat dari store
  const wargaListDetails = useSelector(state => state.wargaListDetails);

  //lihat dari reducer apa yang di return oleh postDetails
  const { loading, error, warga } = wargaListDetails;

  useEffect(() => {
    dispatch(listwargaDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Detail Warga bernama {warga.nama}</h3>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={warga.nama}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Nomor KTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter email"
                value={warga.no_ktp}
                onChange={e => setNoKtp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="agama">
              <Form.Label>Agama</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter password"
                value={warga.agama}
                onChange={e => setAgama(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tLahir">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.t_lahir}
                onChange={e => setTLahir(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.tanggal_lahir}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="JenisKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.j_kelamin}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lingkungan">
              <Form.Label>Lingkungan</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.lingkungan}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="gol_darah">
              <Form.Label>Golongan Darah</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.gol_darah}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="w_negara">
              <Form.Label>Warga Negara</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.w_negara}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pendidikan">
              <Form.Label>Pendidikan</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.pendidikan}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pekerjaan">
              <Form.Label>Pekerjaan</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.pekerjaan}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="s_nikah">
              <Form.Label>Status Nikah</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.s_nikah}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="confirm password"
                value={warga.status}
              ></Form.Control>
            </Form.Group>
            {!warga.no_keluarga ? (
              <Loader />
            ) : (
              <>
                <Form.Group controlId="no_kk">
                  <Form.Label>No KK</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="confirm password"
                    value={warga.no_keluarga.no_kk}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="alamat">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="confirm password"
                    value={warga.no_keluarga.alamat}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="RT">
                  <Form.Label>RT</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="confirm password"
                    value={warga.no_keluarga.RT}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="RW">
                  <Form.Label>RW</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="confirm password"
                    value={warga.no_keluarga.RW}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="kecamatan">
                  <Form.Label>Kecamatan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="confirm password"
                    value={warga.no_keluarga.kecamatan}
                  ></Form.Control>
                </Form.Group>
              </>
            )}
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default DetailWarga;
