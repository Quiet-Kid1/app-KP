import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ListDataWarga = props => {
  const [listWarga, setListWarga] = useState([]);

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }

    const fetchLists = async () => {
      const response = await axios.get('/api/listwarga');

      setListWarga(response.data);
    };

    fetchLists();
  }, [listWarga, props.history]);
  return (
    <>
      <div className="py-5">
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nomor KTP</th>
                {/* <th>Nama Keluarga</th> */}
                <th>Nama</th>
                <th>Agama</th>
                <th>Tempat Lahir</th>
                <th>Umur</th>
                <th>Jenis Kelamin</th>
                <th>Gol. Darah</th>
                <th>Pekerjaan</th>
                <th>Status Nikah</th>
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
                      {/* <td>
                      <Link to={`/admin/detailkeluarga/${warga.no_keluarga}`}>
                        {warga.no_keluarga}
                      </Link>
                    </td> */}
                      <td>{warga.nama}</td>
                      <td>{warga.agama}</td>
                      <td>{warga.t_lahir}</td>
                      <td>{years}</td>
                      <td>{warga.j_kelamin}</td>
                      <td>{warga.gol_darah}</td>

                      <td>{warga.pekerjaan}</td>
                      <td>{warga.s_nikah}</td>
                      <td>{warga.status}</td>
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
        </Container>
      </div>
    </>
  );
};

export default ListDataWarga;
