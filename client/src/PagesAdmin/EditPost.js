import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { POST_UPDATE_RESET } from '../constants/postConstants';
import { listPostDetails, updatePost } from '../actions/postAction';

const EditPost = ({ history, match }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  //lihat dari store
  const postDetails = useSelector(state => state.postDetails);
  const { loading, error, post } = postDetails;

  //lihat dari store
  const postUpdate = useSelector(state => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      history.push('/admin/listposts');
    } else {
      if (!post.title || post._id !== postId) {
        dispatch(listPostDetails(postId));
      } else {
        setTitle(post.title);
        setDescription(post.description);
        setImage(post.image);
      }
    }
  }, [dispatch, successUpdate, match, postId, post]);

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
      updatePost({
        _id: postId,
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
          <h3>Edit Data Post</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Judul Post</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Judul Post"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Deskripsi Post</Form.Label>
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
              <Form.Label>Gambar Post</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter image url (opsional)"
                value={image}
                onChange={e => setImage(e.target.value)}
                disabled
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary">
              Edit
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default EditPost;
