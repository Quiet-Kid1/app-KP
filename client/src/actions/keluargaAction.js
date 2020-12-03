import axios from 'axios';

import {
  KELUARGA_LIST_FAIL,
  KELUARGA_LIST_REQUEST,
  KELUARGA_LIST_SUCCESS,
  KELUARGA_CREATE_FAIL,
  KELUARGA_CREATE_REQUEST,
  KELUARGA_CREATE_SUCCESS,
  KELUARGA_DELETE_FAIL,
  KELUARGA_DELETE_REQUEST,
  KELUARGA_DELETE_SUCCESS,
  KELUARGA_DETAILS_FAIL,
  KELUARGA_DETAILS_REQUEST,
  KELUARGA_DETAILS_SUCCESS,
  KELUARGA_UPDATE_REQUEST,
  KELUARGA_UPDATE_SUCCESS,
  KELUARGA_UPDATE_FAIL,
} from '../constants/keluargaConstants';

export const listKeluargas = () => async dispatch => {
  try {
    dispatch({ type: KELUARGA_LIST_REQUEST });

    const { data } = await axios.get('/api/listkeluarga');

    dispatch({
      type: KELUARGA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KELUARGA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listKeluargaDetails = id => async dispatch => {
  try {
    dispatch({ type: KELUARGA_DETAILS_REQUEST });

    const response = await axios.get(`/api/keluargawarga/${id}`);

    dispatch({
      type: KELUARGA_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: KELUARGA_DETAILS_FAIL,
      payload: 'Data rincian keluarga tidak ada',
    });
  }
};

export const createKeluarga = dataKeluarga => async (dispatch, getState) => {
  try {
    dispatch({
      type: KELUARGA_CREATE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/listkeluarga`,
      dataKeluarga,
      config
    );

    dispatch({
      type: KELUARGA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KELUARGA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteKeluarga = id => async dispatch => {
  try {
    dispatch({
      type: KELUARGA_DELETE_REQUEST,
    });

    await axios.delete(`/api/listkeluarga/${id}`);

    dispatch({
      type: KELUARGA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: KELUARGA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateKeluarga = dataKeluarga => async (dispatch, getState) => {
  try {
    dispatch({
      type: KELUARGA_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/listkeluarga/${dataKeluarga._id}`,
      dataKeluarga,
      config
    );

    dispatch({
      type: KELUARGA_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KELUARGA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
