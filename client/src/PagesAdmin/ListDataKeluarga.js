import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listKeluargas, deleteKeluarga } from '../actions/keluargaAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ListDataKeluarga = props => {
  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const keluargaList = useSelector(state => state.keluargaList);
  const { loading, listKeluarga } = keluargaList;

  const keluargaDelete = useSelector(state => state.keluargaDelete);
  const { success: successDelete, error: errorDelete } = keluargaDelete;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }

    dispatch(listKeluargas());
  }, [dispatch, props.history, userInfo, successDelete]);

  const deleteHandler = id => {
    if (window.confirm('Apakah kamu yakin ingin menghapus data ini ?')) {
      dispatch(deleteKeluarga(id));
    }
  };

  return (
    <>
      <div className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h2>Daftar Keluarga Kelurahan Malalayang I</h2>
            </Col>
            <Col className="text-right">
              <LinkContainer to={`/admin/create/keluarga`}>
                <Button className="my-3">
                  <i className="fas fa-plus"></i> Tambah Data Keluarga
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nomor KK</th>
                  <th>Nama Kepala</th>
                  <th>Alamat</th>
                  <th>RT</th>
                  <th>RW</th>
                  <th>Kelurahan</th>
                  <th>Kecamatan</th>
                  <th>Provinsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listKeluarga.map((keluarga, index) => {
                  return (
                    <>
                      <tr key={keluarga._id}>
                        <td>{index + 1}</td>
                        <Link to={`/admin/detailkeluarga/${keluarga._id}`}>
                          <td>{keluarga.no_kk}</td>
                        </Link>
                        <td>{keluarga.nama_kepala}</td>
                        <td>{keluarga.alamat}</td>
                        <td>{keluarga.RT}</td>
                        <td>{keluarga.RW}</td>
                        <td>{keluarga.kelurahan}</td>
                        <td>{keluarga.kecamatan}</td>
                        <td>{keluarga.Provinsi}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/${keluarga._id}/editkeluarga`}
                          >
                            <Button variant="outline-primary">
                              <i class="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="outline-danger"
                            onClick={() => deleteHandler(keluarga._id)}
                          >
                            <i class="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Container>
      </div>
    </>
  );
};

export default ListDataKeluarga;
