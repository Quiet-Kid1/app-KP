import React, { useEffect } from 'react';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import berita from '../images/berita1.jpg';
import berita2 from '../images/berita2.jpg';
import berita3 from '../images/berita3.jpg';
import Sidebar from '../components/Sidebar';
import ReactHtmlParser from 'react-html-parser';
import { listKeluargas } from '../actions/keluargaAction';
//redux
import { listPosts, listAdminPosts } from '../actions/postAction';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const postAdmin = useSelector(state => state.postAdmin);

  //lihat dari reducer apa yang di return oleh productList
  const { loading, error, semuaBerita } = postAdmin;

  useEffect(() => {
    // dispatch(listPosts(keyword));
    dispatch(listKeluargas());
    dispatch(listAdminPosts(keyword));
  }, [dispatch, keyword]);
  //lihat dari store

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="1500"
            height="500"
            src={berita}
            className="bg-image"
            alt="First slide"
          />

          <Carousel.Caption className="text-left">
            <h3>
              Hasil Pilkada Manado 2020: Yang Unggul di Real Count KPU Sementara
            </h3>
            <LinkContainer to={`/artikel/5fdc85174ddde82bc05b804f`}>
              <Button variant="success" size="lg">
                {' '}
                <i class="fas fa-newspaper"></i> Baca Berita
              </Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="1500"
            height="500"
            src={berita3}
            className="bg-image"
            alt="First slide"
          />

          <Carousel.Caption className="text-left">
            <h3>Dilarang! Kembang Api Tetap Bergemuruh di Manado</h3>
            <LinkContainer to={`/artikel/5ff4820e9b5a0818d04043ef`}>
              <Button variant="success" size="lg">
                {' '}
                <i class="fas fa-newspaper"></i> Baca Berita
              </Button>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row>
          <Col md={9}>
            {loading ? (
              <h2>Memuat berita..</h2>
            ) : (
              <>
                {semuaBerita.length === 0 ? (
                  <>
                    <br></br>
                    <h3>Maaf, untuk pencarian {keyword} belum ada data</h3>
                    <hr></hr>
                    <h4>Silakan kunjungi situs web ini dalam waktu dekat..</h4>
                  </>
                ) : (
                  <>
                    <h2>Berita Terkini</h2>
                    <hr></hr>
                    {semuaBerita.map(post => {
                      var potong = ReactHtmlParser(
                        post.description.substring(0, 305)
                      );
                      var titik = '....';
                      var selengkapnya = potong.concat(titik);
                      return (
                        <>
                          <Card key={post._id}>
                            <Card.Header as="h5">
                              <Link to={`/artikel/${post._id}`}>
                                {post.title}
                              </Link>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title>
                                <i class="fas fa-user iconAdmin"></i>
                                {post.role}
                              </Card.Title>
                              <Card.Text>
                                {potong}
                                {/* <Link to={`/artikel/${post._id}`}>
                                  Selengkapnya
                                </Link> */}
                                <LinkContainer to={`/artikel/${post._id}`}>
                                  <Button variant="outline-primary">
                                    Selengkapnya
                                  </Button>
                                </LinkContainer>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                          <br />
                        </>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
