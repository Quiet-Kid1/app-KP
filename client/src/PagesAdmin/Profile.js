import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfle } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const userDetails = useSelector(state => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        console.log(user);
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password tidak sama');
    } else {
      setMessage('');
      dispatch(updateUserProfle({ id: user._id, name, email, password }));
    }
  };

  return (
    <FormContainer>
      <h2>Profil Pengguna</h2>
      {message && <Message variant="danger">{message}</Message>}
      {success && (
        <Message variant="success">Profil berhasil diperbarui</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="name"
            placeholder="Masukkan Nama"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Masukkan Kata Sandi</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Kata Sandi"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Konfirmasi Kata Sandi</Form.Label>
          <Form.Control
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPassword}
            required
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Ubah
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
