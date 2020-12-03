import axios from 'axios';
import {
  WARGA_LIST_FAIL,
  WARGA_LIST_REQUEST,
  WARGA_LIST_SUCCESS,
  WARGA_DETAILS_FAIL,
  WARGA_DETAILS_REQUEST,
  WARGA_DETAILS_SUCCESS,
  WARGA_DELETE_FAIL,
  WARGA_DELETE_SUCCESS,
  WARGA_DELETE_REQUEST,
  WARGA_CREATE_REQUEST,
  WARGA_CREATE_SUCCESS,
  WARGA_CREATE_FAIL,
  WARGA_UPDATE_REQUEST,
  WARGA_UPDATE_SUCCESS,
  WARGA_UPDATE_FAIL,
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

export const deleteWarga = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: WARGA_DELETE_REQUEST,
    });

    await axios.delete(`/api/listwarga/${id}`);

    dispatch({
      type: WARGA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WARGA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createWarga = dataWarga => async (dispatch, getState) => {
  try {
    dispatch({
      type: WARGA_CREATE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/listwarga`, dataWarga, config);

    dispatch({
      type: WARGA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WARGA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateWarga = dataWarga => async (dispatch, getState) => {
  try {
    dispatch({
      type: WARGA_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/listwarga/${dataWarga._id}`,
      dataWarga,
      config
    );

    dispatch({
      type: WARGA_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WARGA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
