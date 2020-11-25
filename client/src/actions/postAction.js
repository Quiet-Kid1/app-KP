import axios from 'axios';

import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
} from '../constants/postConstants';

export const listPosts = () => async dispatch => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const response = await axios.get('/api/posts');

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listPostDetails = id => async dispatch => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const response = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
