import React, { useEffect } from 'react';
import { Table, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listKeluargaDetails } from '../actions/keluargaAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DetailKeluarga = ({ match }) => {
  const keluargaId = match.params.id;
  const dispatch = useDispatch();

  //lihat dari store
  const keluargaListDetails = useSelector(state => state.keluargaListDetails);

  //lihat dari reducer apa yang di return oleh postDetails
  const { error, keluarga: detailKeluarga } = keluargaListDetails;

  useEffect(() => {
    if (detailKeluarga.length === 0 || detailKeluarga._id !== keluargaId) {
      dispatch(listKeluargaDetails(keluargaId));
    }
  }, [match]);

  console.log(detailKeluarga);
  return (
    <Container className="py-4">
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : detailKeluarga.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h2 style={{ textAlign: 'center' }}>Detail Keluarga</h2>
          <h3 style={{ textAlign: 'center' }}>
            {detailKeluarga.keluarga.no_kk}
          </h3>
          <Row className="py-3">
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  Nama Kepala Keluarga : {detailKeluarga.keluarga.nama_kepala}
                </ListGroup.Item>
                <ListGroup.Item>
                  Alamat : {detailKeluarga.keluarga.alamat}
                </ListGroup.Item>
                <ListGroup.Item>
                  RT/RW: {detailKeluarga.keluarga.RT} /{' '}
                  {detailKeluarga.keluarga.RW}
                </ListGroup.Item>
                <ListGroup.Item>
                  Kelurahan : {detailKeluarga.keluarga.kelurahan}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item>
                  Kecamatan : {detailKeluarga.keluarga.kecamatan}
                </ListGroup.Item>
                <ListGroup.Item>
                  Kabupaten/Kota: {detailKeluarga.keluarga.kota}
                </ListGroup.Item>
                <ListGroup.Item>
                  Kode Pos: {detailKeluarga.keluarga.kode_pos}
                </ListGroup.Item>
                <ListGroup.Item>
                  Provinsi : {detailKeluarga.keluarga.Provinsi}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {detailKeluarga.saudara.length === 0 ? (
              <Col md={12} className="text-center py-3">
                <Alert variant="primary">Belum Berkeluarga</Alert>
              </Col>
            ) : (
              <>
                <div className="py-5">
                  <Col md={12} className="text-center py-3">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama Lengkap</th>
                          <th>NIK</th>
                          <th>Jenis Kelamin</th>
                          <th>Tanggal Lahir</th>
                          <th>Agama</th>
                          <th>Pendidikan</th>
                          <th>Jenis Pekerjaan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailKeluarga.saudara.map((list, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{list.nama}</td>
                                <td>{list.no_ktp}</td>
                                <td>{list.j_kelamin}</td>
                                <td>{list.tanggal_lahir.substring(0, 10)}</td>
                                <td>{list.agama}</td>
                                <td>{list.pendidikan}</td>
                                <td>{list.pekerjaan}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                      <br />
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Status Perkawinan</th>
                          <th>Kewarganegaraan</th>
                          {/* <tr>
                        <th colSpan="4">Nama Orang Tua</th>
                      </tr>
                      <tr>
                        <th>Ayah</th>
                        <th>Ibu</th>
                      </tr> */}
                        </tr>
                      </thead>
                      <tbody>
                        {detailKeluarga.saudara.map((list, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{list.s_nikah}</td>
                                <td>WNI</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </div>
              </>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default DetailKeluarga;
