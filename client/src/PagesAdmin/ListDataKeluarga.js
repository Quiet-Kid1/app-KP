import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listKeluargas, deleteKeluarga } from '../actions/keluargaAction';
import MUIDataTable from 'mui-datatables';
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

  const rows = listKeluarga.map(keluarga => {
    return {
      no_kk: (
        <Link to={`/admin/detailkeluarga/${keluarga._id}`}>
          {keluarga.no_kk}
        </Link>
      ),
      nama_kepala: keluarga.nama_kepala,
      alamat: keluarga.alamat,
      RW: keluarga.RW,
      kelurahan: keluarga.kelurahan,
      kecamatan: keluarga.kecamatan,
      Provinsi: keluarga.Provinsi,
      edit: (
        <LinkContainer to={`/admin/${keluarga._id}/editkeluarga`}>
          <Button variant="outline-primary">
            <i class="fas fa-edit"></i>
          </Button>
        </LinkContainer>
      ),
      delete: (
        <Button
          variant="outline-danger"
          onClick={() => deleteHandler(keluarga._id)}
        >
          <i class="fas fa-trash"></i>
        </Button>
      ),
    };
  });

  const columns = [
    {
      label: 'Nomor KK',
      name: 'no_kk',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Kepala Keluarga',
      name: 'nama_kepala',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Alamat',
      name: 'alamat',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'RW',
      name: 'RW',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Kelurahan',
      name: 'kelurahan',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Kecamatan',
      name: 'kecamatan',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Provinsi',
      name: 'Provinsi',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Edit',
      name: 'edit',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Hapus',
      name: 'delete',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options = {
    filterType: 'checkbox',
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
            <MUIDataTable data={rows} columns={columns} options={options} />
          )}
        </Container>
      </div>
    </>
  );
};

export default ListDataKeluarga;
