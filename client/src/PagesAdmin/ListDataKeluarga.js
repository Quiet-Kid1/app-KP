import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ListDataKeluarga = props => {
  const [listKeluarga, setListKeluarga] = useState([]);

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }
    const fetchKeluarga = async () => {
      const response = await axios.get('/api/listkeluarga');

      setListKeluarga(response.data);
    };

    fetchKeluarga();
  }, [listKeluarga, props.history]);
  return (
    <>
      <div className="py-5">
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
                      <Button variant="outline-primary">a</Button>
                      <Button variant="outline-danger">X</Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListDataKeluarga;
