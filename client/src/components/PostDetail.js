import React, { useEffect } from 'react';

import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Loader from './Loader';
import { listPostDetails } from '../actions/postAction';
import { useDispatch, useSelector } from 'react-redux';

const PostDetail = props => {
  const dispatch = useDispatch();

  //lihat dari store
  const postDetails = useSelector(state => state.postDetails);

  //lihat dari reducer apa yang di return oleh postDetails
  const { loading, error, post } = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(props.match.params.id));
  }, [props.match]);

  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            {loading ? (
              <Loader />
            ) : (
              <Card>
                <Card.Header>{post.title}</Card.Header>
                <Card.Body>
                  <Card.Title>
                    <i class="fas fa-user iconAdmin"></i>
                    {post.role}
                  </Card.Title>
                  {post.image ? (
                    <>
                      <Image src={post.image} alt={post.title} fluid />
                      <br />
                      <br />
                    </>
                  ) : null}

                  <Card.Text>{post.description}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default PostDetail;
