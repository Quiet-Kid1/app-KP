import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { POST_CREATE_RESET } from '../constants/postConstants';
import { createPost } from '../actions/postAction';

const CreatePost = ({ history }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  //lihat dari store
  const postCreate = useSelector(state => state.postCreate);
  const { loading, error, success: successCreate } = postCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      history.push('/admin/listposts');
    }
  }, [dispatch, successCreate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = event => {
    event.preventDefault();

    dispatch(
      createPost({
        title,
        description,
        image,
      })
    );
  };

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3>Buat Berita</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Judul Berita</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Judul Berita"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Deskripsi Berita</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Gambar Berita</Form.Label>
              <Form.Control
                type="text"
                placeholder="masukkan gambar (opsional)"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Pilih Gambar"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary">
              Buat
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default CreatePost;
