import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const userDetails = useSelector(state => state.userDetails);

  // 3 value ini dari login reducer
  const { loading, error, user } = userDetails;

  //cek store untuk mengetahui state.userLogin darimana
  const userUpdate = useSelector(state => state.userUpdate);

  // 3 value ini dari login reducer
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/listpengguna');
    } else {
      if (!user.role || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [user, dispatch, userId, successUpdate, history]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(updateUser({ _id: userId, name, email, role }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3"></Link>
      <FormContainer>
        <h1>Ubah Pengguna</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Peran</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="Lurah">Lurah</option>
                <option value="Sekertaris">Sekertaris</option>
                <option value="Lingkungan">Lingkungan</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Ubah
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
