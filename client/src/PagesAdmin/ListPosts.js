import React, { useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

//redux
import { listPosts } from '../actions/postAction';

const ListPosts = props => {
  const dispatch = useDispatch();

  //lihat dari store
  const postList = useSelector(state => state.postList);

  //lihat dari reducer apa yang di return oleh productList
  const { loading, error, posts } = postList;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    } else if (userInfo.role === 'Lingkungan') {
      props.history.push('/');
    }
    dispatch(listPosts());
  }, [dispatch, props.history, userInfo]);

  return (
    <>
      <Container className="py-5">
        {posts.length === 0 ? (
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
              {posts.map((post, index) => {
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
