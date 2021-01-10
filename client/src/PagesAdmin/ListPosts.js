import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ReactHtmlParser from 'react-html-parser';
import { deletePost } from '../actions/postAction';
import {} from '../constants/postConstants';
import MUIDataTable from 'mui-datatables';

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

  const rows = posts.map(post => {
    var edit = (
      <LinkContainer to={`/admin/${post._id}/editpost`}>
        <Button variant="outline-primary">
          <i class="fas fa-edit"></i>
        </Button>
      </LinkContainer>
    );
    var hapus = (
      <Button variant="outline-danger" onClick={() => deleteHandler(post._id)}>
        <i class="fas fa-trash"></i>
      </Button>
    );

    if (post.image) {
      var gambar = <img src={post.image} width="100" height="100" />;
    } else {
      var gambar = 'gambar tidak dimasukkan';
    }

    return {
      title: post.title,
      description: ReactHtmlParser(post.description.substring(0, 305)),
      image: gambar,
      edit: edit,
      hapus: hapus,
    };
  });

  const columns = [
    {
      label: 'Judul Berita',
      name: 'title',
      options: {
        filter: true,
      },
    },
    {
      label: 'Deskripsi Berita',
      name: 'description',
      options: {
        filter: true,
      },
    },
    {
      label: 'Gambar Berita',
      name: 'image',
      options: {
        filter: true,
      },
    },
    {
      label: 'Ubah',
      name: 'edit',
      options: {
        filter: true,
      },
    },
    {
      label: 'Hapus',
      name: 'hapus',
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    textLabels: {
      pagination: {
        next: 'Halaman Berikutnya',
        previous: 'Halaman Sebelumnya',
        rowsPerPage: 'Baris Perhalaman:',
        displayRows: 'dari',
      },
      toolbar: {
        search: 'cari',
        viewColumns: 'Lihat Kolom',
        filterTable: 'Filter Tabel',
      },
      filter: {
        title: 'filter',
        reset: 'reset',
      },
      viewColumns: {
        title: 'lihat kolom',
      },
      selectedRows: {
        text: 'baris yang dihapus',
        delete: 'Hapus',
      },
    },
  };

  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col>
            <h2>Daftar Berita Kelurahan Malalayang I</h2>
          </Col>
          <Col className="text-right">
            <LinkContainer to={`/admin/create/post`}>
              <Button className="my-3">
                <i className="fas fa-plus"></i> Tambah Data Berita
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {posts.length === 0 ? (
          <Loader />
        ) : (
          <MUIDataTable data={rows} columns={columns} options={options} />
        )}
      </Container>
    </>
  );
};

export default ListPosts;
