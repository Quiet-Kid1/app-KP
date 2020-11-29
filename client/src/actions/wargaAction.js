import axios from 'axios';
import {
  WARGA_LIST_FAIL,
  WARGA_LIST_REQUEST,
  WARGA_LIST_SUCCESS,
  WARGA_DETAILS_FAIL,
  WARGA_DETAILS_REQUEST,
  WARGA_DETAILS_SUCCESS,
} from '../constants/wargaConstants';

export const listwargas = () => async dispatch => {
  try {
    dispatch({ type: WARGA_LIST_REQUEST });

    const response = await axios.get('/api/listwarga');

    dispatch({
      type: WARGA_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: WARGA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listwargaDetails = id => async dispatch => {
  try {
    dispatch({ type: WARGA_DETAILS_REQUEST });

    const response = await axios.get(`/api/detailwarga/${id}`);

    dispatch({
      type: WARGA_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: WARGA_DETAILS_FAIL,
      payload: 'Data rincian warga tidak ada',
    });
  }
};
