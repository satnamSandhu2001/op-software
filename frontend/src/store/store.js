import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  deleteAccountReducer,
  forgotPasswordReducer,
  profileReducer,
  resetPasswordReducer,
  userReducer,
} from './reducers/userReducer';
import { cartReducer, orderReducer } from './reducers/orderReducer';
import { softwareReducer } from './reducers/softwareReducer';

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  deleteAccount: deleteAccountReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  software: softwareReducer,
  order: orderReducer,
  cart: cartReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
