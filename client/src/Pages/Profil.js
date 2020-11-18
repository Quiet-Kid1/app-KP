import React from 'react';
import ProfileData from '../ProfileData';
import { Container, Card, Row, Col } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

import Sidebar from '../components/Sidebar';

const Profil = props => {
  const Post = ProfileData.find(post => post._id === props.match.params.id);
  const description = Post.description;

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
                <Card.Text>{ReactHtmlParser(description)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default Profil;
