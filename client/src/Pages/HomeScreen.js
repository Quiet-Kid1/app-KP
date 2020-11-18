import React, { useState, useEffect } from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Sakurajima from '../images/pict1.png';
import Sakurajima2 from '../images/pict2.jpg';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const HomeScreen = () => {
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
      <Carousel>
        <LinkContainer to="/action">
          <Carousel.Item>
            <img
              className="d-block w-100"
              width="800"
              height="400"
              src={Sakurajima}
              alt="First slide"
            />

            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </LinkContainer>
        <Carousel.Item>
          <img
            width="800"
            height="400"
            className="d-block w-100"
            src={Sakurajima2}
            alt="First slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="800"
            height="400"
            src={Sakurajima}
            alt="First slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row>
          <Col md={9}>
            <h2>Artikel Terkini</h2>
            <hr></hr>
            {Posts.map(post => {
              const potong = post.description.substring(0, 305);
              return (
                <>
                  <Card key={post._id}>
                    <Card.Header as="h5">
                      <Link to={`/artikel/${post._id}`}>{post.title}</Link>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <i class="fas fa-user iconAdmin"></i>
                        {post.role}
                      </Card.Title>
                      <Card.Text>
                        {potong}...
                        <Link to={`/artikel/${post._id}`}>Selengkapnya</Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </>
              );
            })}
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
