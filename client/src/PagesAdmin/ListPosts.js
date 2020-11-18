import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';

import axios from 'axios';

const ListPosts = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts');

      setPosts(response.data);
    };

    fetchPosts();
  }, [Posts]);

  return (
    <>
      <Container className="py-5">
        {Posts.length === 0 ? (
          'Tunggu sebentar....'
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul Post</th>
                <th>Deskripsi Post</th>
                <th>Gambar Post</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Posts.map((post, index) => {
                return (
                  <>
                    <tr key={post._id}>
                      <td>{index + 1}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      {post.image ? (
                        <td>
                          <img
                            className="d-block w-100"
                            width="200"
                            height="100"
                            src={post.image}
                            alt="First slide"
                          />
                        </td>
                      ) : (
                        <td>Tidak ada gambar yang dimasukkan</td>
                      )}
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
        )}
      </Container>
    </>
  );
};

export default ListPosts;
