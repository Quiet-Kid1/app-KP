import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Row, Col } from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
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
  const { error: errorDelete, success: successDelete } = wargaDelete;

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

  const rows = listWarga.map(warga => {
    if (!userInfo.pala) {
      var authorizeEdit = (
        <LinkContainer to={`/admin/detailwarga/${warga._id}`}>
          <Button variant="outline-primary">
            <i class="fas fa-info-circle"></i>
          </Button>
        </LinkContainer>
      );
      var authorizeDelete = (
        <Button
          variant="outline-danger"
          onClick={() => deleteHandler(warga._id)}
        >
          <i class="fas fa-trash"></i>
        </Button>
      );
    } else {
      if (userInfo.pala === warga.lingkungan) {
        var authorizeEdit = (
          <LinkContainer to={`/admin/detailwarga/${warga._id}`}>
            <Button variant="outline-primary">
              <i class="fas fa-info-circle"></i>
            </Button>
          </LinkContainer>
        );
        var authorizeDelete = (
          <Button
            variant="outline-danger"
            onClick={() => deleteHandler(warga._id)}
          >
            <i class="fas fa-trash"></i>
          </Button>
        );
      }
    }

    return {
      no_ktp: warga.no_ktp,
      no_keluarga: warga.no_keluarga[0].no_kk,
      nama: warga.nama,
      agama: warga.agama,
      t_lahir: warga.t_lahir,
      umurWarga: warga.UmurWarga,
      j_kelamin: warga.j_kelamin,
      gol_darah: warga.gol_darah,
      pekerjaan: warga.pekerjaan,
      lingkungan: warga.lingkungan,
      edit: authorizeEdit,
      hapus: authorizeDelete,
    };
  });

  const columns = [
    {
      label: 'Nomor KTP',
      name: 'no_ktp',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Nomor KK',
      name: 'no_keluarga',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Nama',
      name: 'nama',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Agama',
      name: 'agama',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Tempat Lahir',
      name: 't_lahir',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Umur',
      name: 'umurWarga',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Jenis Kelamin',
      name: 'j_kelamin',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Pekerjaan',
      name: 'pekerjaan',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Lingkungan',
      name: 'lingkungan',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Edit',
      name: 'edit',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: 'Hapus',
      name: 'hapus',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const options = {
    download: false,
    print: false,
  };

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
            <MUIDataTable data={rows} columns={columns} options={options} />
          )}
        </Container>
      </div>
    </>
  );
};

export default ListDataWarga;
