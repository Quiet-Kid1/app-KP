import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  postListReducer,
  postListDetails,
  postCreateReducer,
  postDeleteReducer,
  postUpdateReducer,
} from './reducer/postReducer';
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducer/userReducer';

import {
  wargaListReducer,
  wargaListDetailsReducer,
  wargaDeleteReducer,
  wargaCreateReducer,
  wargaUpdateReducer,
} from './reducer/wargaReducer';

import {
  keluargaListReducer,
  keluargaListDetailsReducer,
  keluargaCreateReducer,
  keluargaDeleteReducer,
  keluargaUpdateReducer,
} from './reducer/keluargaReducer';

const reducer = combineReducers({
  postList: postListReducer,
  postDetails: postListDetails,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  wargaList: wargaListReducer,
  wargaListDetails: wargaListDetailsReducer,
  wargaDelete: wargaDeleteReducer,
  wargaCreate: wargaCreateReducer,
  wargaUpdate: wargaUpdateReducer,
  keluargaList: keluargaListReducer,
  keluargaListDetails: keluargaListDetailsReducer,
  keluargaCreate: keluargaCreateReducer,
  keluargaDelete: keluargaDeleteReducer,
  keluargaUpdate: keluargaUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
