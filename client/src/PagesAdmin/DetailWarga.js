import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listwargaDetails } from '../actions/wargaAction';

const DetailWarga = ({ match }) => {
  const wargaId = match.params.id;
  const [tanggal_lahir, setTanggal_lahir] = useState(new Date());
  const dispatch = useDispatch();

  //lihat dari store
  const wargaListDetails = useSelector(state => state.wargaListDetails);

  //lihat dari reducer apa yang di return oleh postDetails
  const { loading, error, warga } = wargaListDetails;

  useEffect(() => {
    if (!warga.nama || warga._id !== wargaId) {
      dispatch(listwargaDetails(wargaId));
    } else {
      setTanggal_lahir(new Date(warga.tanggal_lahir));
    }
  }, [dispatch, match, warga.tanggal_lahir]);

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col className="text-right">
              <LinkContainer to={`/admin/${warga._id}/edit`}>
                <Button className="my-3">
                  <i className="fas fa-edit"></i> {''}Edit Data Warga
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          <h3>Detail Warga bernama {warga.nama}</h3>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama"
                value={warga.nama}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="noKtp">
              <Form.Label>Nomor KTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor KTP"
                value={warga.no_ktp}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="agama">
              <Form.Label>Agama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Agama"
                value={warga.agama}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tLahir">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Tempat Lahir"
                value={warga.t_lahir}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <br />
              <DatePicker
                selected={tanggal_lahir}
                onChange={date => setTanggal_lahir(date)}
              />
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
                    value={!warga.no_keluarga.RW ? '/' : warga.no_keluarga.RW}
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
