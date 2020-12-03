import {
  KELUARGA_CREATE_FAIL,
  KELUARGA_CREATE_REQUEST,
  KELUARGA_CREATE_RESET,
  KELUARGA_CREATE_SUCCESS,
  KELUARGA_DELETE_FAIL,
  KELUARGA_DELETE_REQUEST,
  KELUARGA_DELETE_SUCCESS,
  KELUARGA_DETAILS_FAIL,
  KELUARGA_DETAILS_REQUEST,
  KELUARGA_DETAILS_SUCCESS,
  KELUARGA_DETAILS_RESET,
  KELUARGA_LIST_FAIL,
  KELUARGA_LIST_REQUEST,
  KELUARGA_LIST_SUCCESS,
  KELUARGA_UPDATE_FAIL,
  KELUARGA_UPDATE_REQUEST,
  KELUARGA_UPDATE_RESET,
  KELUARGA_UPDATE_SUCCESS,
} from '../constants/keluargaConstants';

export const keluargaListReducer = (state = { listKeluarga: [] }, action) => {
  switch (action.type) {
    case KELUARGA_LIST_REQUEST:
      return { loading: true, listKeluarga: [] };
    case KELUARGA_LIST_SUCCESS:
      return { loading: false, listKeluarga: action.payload };
    case KELUARGA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const keluargaListDetailsReducer = (
  state = { keluarga: [] },
  action
) => {
  switch (action.type) {
    case KELUARGA_DETAILS_REQUEST:
      return { loading: true, ...state };
    case KELUARGA_DETAILS_SUCCESS:
      return { loading: false, keluarga: action.payload };
    case KELUARGA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case KELUARGA_DETAILS_RESET:
      return { keluarga: [] };
    default:
      return state;
  }
};

export const keluargaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case KELUARGA_CREATE_REQUEST:
      return { loading: true };
    case KELUARGA_CREATE_SUCCESS:
      return { loading: false, success: true, warga: action.payload };
    case KELUARGA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case KELUARGA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const keluargaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case KELUARGA_DELETE_REQUEST:
      return { loading: true };
    case KELUARGA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case KELUARGA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const keluargaUpdateReducer = (state = { keluarga: {} }, action) => {
  switch (action.type) {
    case KELUARGA_UPDATE_REQUEST:
      return { loading: true };
    case KELUARGA_UPDATE_SUCCESS:
      return { loading: false, success: true, keluarga: action.payload };
    case KELUARGA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case KELUARGA_UPDATE_RESET:
      return { warga: {} };
    default:
      return state;
  }
};
