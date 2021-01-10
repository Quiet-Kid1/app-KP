import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);

  // 3 value ini dari login reducer
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(login(name, password));
  };

  return (
    <FormContainer>
      <h1>Silahkan Masuk</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nama Pengguna</Form.Label>
          <Form.Control
            type="text"
            placeholder="masukkan nama"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Kata Sandi</Form.Label>
          <Form.Control
            type="password"
            placeholder="masukkan kata sandi"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Masuk
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
