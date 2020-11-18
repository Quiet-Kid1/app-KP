import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';
import ListWarga from '../ListWarga';

const ListDataWarga = () => {
  return (
    <>
      <Container className="py-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nomor KTP</th>
              <th>Nama Keluarga</th>
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
            {ListWarga.map((warga, index) => {
              const today = new Date();
              const DOB = new Date(warga.tanggal_lahir);
              const years = today.getFullYear() - DOB.getFullYear();

              return (
                <>
                  <tr key={warga._id}>
                    <td>{index + 1}</td>
                    <td>{warga.no_ktp}</td>
                    <td>
                      <Link>{warga.no_keluarga}</Link>
                    </td>
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
    </>
  );
};

export default ListDataWarga;
