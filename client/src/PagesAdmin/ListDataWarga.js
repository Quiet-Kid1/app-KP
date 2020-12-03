import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listwargas, deleteWarga } from '../actions/wargaAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ListDataWarga = props => {
  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const wargaList = useSelector(state => state.wargaList);
  const { loading, listWarga } = wargaList;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  //cek store untuk mengetahui state.userLogin darimana
  const wargaDelete = useSelector(state => state.wargaDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = wargaDelete;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }

    dispatch(listwargas());
  }, [dispatch, props.history, successDelete, userInfo]);

  const deleteHandler = id => {
    if (window.confirm('Apakah kamu yakin ?')) {
      dispatch(deleteWarga(id));
    }
  };

  const dataExport = listWarga.map(item => {
    return {
      ...item,
      keluarga: item.no_keluarga[0].no_kk,
    };
  });

  return (
    <>
      <div className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h2>Daftar Warga Kelurahan Malalayang I</h2>
            </Col>
            <Col className="text-right">
              <LinkContainer to={`/admin/create/warga`}>
                <Button>
                  <i className="fas fa-plus"></i> Tambah Data Warga
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              {
                <ExcelFile
                  element={
                    <Button variant="outline-success">
                      Download Data sebagai Excel
                    </Button>
                  }
                >
                  <ExcelSheet data={dataExport} name="Data Warga">
                    <ExcelColumn label="Nomor KTP" value="no_ktp" />
                    <ExcelColumn label="Nomor KK" value="keluarga" />
                    <ExcelColumn label="Nama" value="nama" />
                    <ExcelColumn label="Agama" value="agama" />
                    <ExcelColumn label="Tempat Lahir" value="t_lahir" />
                    <ExcelColumn label="Umur" value="UmurWarga" />
                    <ExcelColumn label="Jenis Kelamin" value="j_kelamin" />
                    <ExcelColumn label="Golongan Darah" value="gol_darah" />
                    <ExcelColumn label="Pekerjaan" value="pekerjaan" />
                    <ExcelColumn label="Status" value="status" />
                  </ExcelSheet>
                </ExcelFile>
              }
            </Col>
          </Row>
          <br />
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <>
              <Table striped bordered hover id="table-to-xls">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor KTP</th>
                    <th>Nomor KK</th>
                    <th>Nama</th>
                    <th>Agama</th>
                    <th>Tempat Lahir</th>
                    <th>Umur</th>
                    <th>Jenis Kelamin</th>
                    <th>Gol. Darah</th>
                    <th>Pekerjaan</th>

                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listWarga.map((warga, index) => {
                    return (
                      <>
                        <tr key={warga._id}>
                          <td>{index + 1}</td>
                          <td>{warga.no_ktp}</td>
                          <td>{warga.no_keluarga[0].no_kk}</td>
                          <td>{warga.nama}</td>
                          <td>{warga.agama}</td>
                          <td>{warga.t_lahir}</td>
                          <td>{warga.UmurWarga}</td>
                          <td>{warga.j_kelamin}</td>
                          <td>{warga.gol_darah}</td>
                          <td>{warga.pekerjaan}</td>
                          <td>{warga.status}</td>
                          <td>
                            <LinkContainer
                              to={`/admin/detailwarga/${warga._id}`}
                            >
                              <Button variant="outline-primary">
                                <i class="fas fa-info-circle"></i>
                              </Button>
                            </LinkContainer>
                            <Button
                              variant="outline-danger"
                              onClick={() => deleteHandler(warga._id)}
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
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ListDataWarga;
