import {
  WARGA_CREATE_FAIL,
  WARGA_CREATE_REQUEST,
  WARGA_CREATE_RESET,
  WARGA_CREATE_SUCCESS,
  WARGA_DELETE_FAIL,
  WARGA_DELETE_REQUEST,
  WARGA_DELETE_SUCCESS,
  WARGA_DETAILS_FAIL,
  WARGA_DETAILS_REQUEST,
  WARGA_DETAILS_SUCCESS,
  WARGA_LIST_FAIL,
  WARGA_LIST_REQUEST,
  WARGA_LIST_SUCCESS,
  WARGA_UPDATE_FAIL,
  WARGA_UPDATE_REQUEST,
  WARGA_UPDATE_RESET,
  WARGA_UPDATE_SUCCESS,
} from '../constants/wargaConstants';

export const wargaListReducer = (state = { listWarga: [] }, action) => {
  switch (action.type) {
    case WARGA_LIST_REQUEST:
      return { loading: true, listWarga: [] };
    case WARGA_LIST_SUCCESS:
      return { loading: false, listWarga: action.payload };
    case WARGA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wargaListDetailsReducer = (state = { warga: {} }, action) => {
  switch (action.type) {
    case WARGA_DETAILS_REQUEST:
      return { loading: true, ...state };
    case WARGA_DETAILS_SUCCESS:
      return { loading: false, warga: action.payload };
    case WARGA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wargaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WARGA_DELETE_REQUEST:
      return { loading: true };
    case WARGA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WARGA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wargaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WARGA_CREATE_REQUEST:
      return { loading: true };
    case WARGA_CREATE_SUCCESS:
      return { loading: false, success: true, warga: action.payload };
    case WARGA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WARGA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const wargaUpdateReducer = (state = { warga: {} }, action) => {
  switch (action.type) {
    case WARGA_UPDATE_REQUEST:
      return { loading: true };
    case WARGA_UPDATE_SUCCESS:
      return { loading: false, success: true, warga: action.payload };
    case WARGA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WARGA_UPDATE_RESET:
      return { warga: {} };
    default:
      return state;
  }
};
