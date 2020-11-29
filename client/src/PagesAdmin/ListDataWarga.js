import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listwargas } from '../actions/wargaAction';
import Loader from '../components/Loader';

const ListDataWarga = props => {
  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const wargaList = useSelector(state => state.wargaList);

  // 3 value ini dari login reducer
  const { loading, listWarga } = wargaList;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }

    dispatch(listwargas());
  }, [dispatch, props.history]);
  return (
    <>
      <div className="py-5">
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <Table striped bordered hover>
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
                  const today = new Date();
                  const DOB = new Date(warga.tanggal_lahir);
                  const years = today.getFullYear() - DOB.getFullYear();

                  return (
                    <>
                      <tr key={warga._id}>
                        <td>{index + 1}</td>
                        <td>{warga.no_ktp}</td>
                        <td>{warga.no_keluarga.no_kk}</td>
                        <td>{warga.nama}</td>
                        <td>{warga.agama}</td>
                        <td>{warga.t_lahir}</td>
                        <td>{years}</td>
                        <td>{warga.j_kelamin}</td>
                        <td>{warga.gol_darah}</td>
                        <td>{warga.pekerjaan}</td>
                        <td>{warga.status}</td>
                        <td>
                          <LinkContainer to={`/admin/detailwarga/${warga._id}`}>
                            <Button variant="outline-primary">
                              <i class="fas fa-info-circle"></i>
                            </Button>
                          </LinkContainer>
                          <LinkContainer to="/">
                            <Button variant="outline-danger">
                              <i class="fas fa-trash-alt"></i>
                            </Button>
                          </LinkContainer>
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

export default ListDataWarga;
