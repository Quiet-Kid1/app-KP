import React, { useState, useEffect } from 'react';

import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';

const PostDetail = props => {
  const [Post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/api/posts/${props.match.params.id}`);

      setPost(response.data);
    };

    fetchPost();
  }, [props.match]);
  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>{Post.title}</Card.Header>
              <Card.Body>
                <Card.Title>
                  <i class="fas fa-user iconAdmin"></i>
                  {Post.role}
                </Card.Title>
                {Post.image ? (
                  <>
                    <Image src={Post.image} alt={Post.title} fluid />
                    <br />
                    <br />
                  </>
                ) : null}

                <Card.Text>{Post.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default PostDetail;
