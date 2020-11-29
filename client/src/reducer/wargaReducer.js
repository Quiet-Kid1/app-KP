import {
  WARGA_DETAILS_FAIL,
  WARGA_DETAILS_REQUEST,
  WARGA_DETAILS_SUCCESS,
  WARGA_LIST_FAIL,
  WARGA_LIST_REQUEST,
  WARGA_LIST_SUCCESS,
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
      return { loading: true, warga: {} };
    case WARGA_DETAILS_SUCCESS:
      return { loading: false, warga: action.payload };
    case WARGA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
