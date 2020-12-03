import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ReactHtmlParser from 'react-html-parser';
import { deletePost } from '../actions/postAction';
import {} from '../constants/postConstants';

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
  const { userInfo } = userLogin;

  const postDelete = useSelector(state => state.postDelete);
  const { error: errorDelete, success: successDelete } = postDelete;

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/admin/login');
    }
    dispatch(listPosts());
  }, [dispatch, props.history, successDelete, userInfo]);

  const deleteHandler = id => {
    if (window.confirm('Apakah kamu yakin ?')) {
      dispatch(deletePost(id));
    }
  };
  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col>
            <h2>Daftar Post Kelurahan Malalayang I</h2>
          </Col>
          <Col className="text-right">
            <LinkContainer to={`/admin/create/post`}>
              <Button className="my-3">
                <i className="fas fa-plus"></i> Tambah Data Post
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {posts.length === 0 ? (
          <Loader />
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
                      <td>
                        {ReactHtmlParser(post.description.substring(0, 305))}
                        {'......'}
                      </td>
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
                        <LinkContainer to={`/admin/${post._id}/editpost`}>
                          <Button variant="outline-primary">
                            <i class="fas fa-info-circle"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteHandler(post._id)}
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
    </>
  );
};

export default ListPosts;
