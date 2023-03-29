import axios from 'axios';
import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  CART_RESET,
  LOADING_FALSE,
  LOADING_TRUE,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_RESET,
  NEW_ORDER_SUCCESS,
} from '../constants/orderConstants';

export const addToCart = (cartData) => async (dispatch) => {
  dispatch({ type: ADD_CART_REQUEST });
  dispatch({ type: ADD_CART_SUCCESS, payload: cartData });
};
export const resetCart = () => async (dispatch) => {
  dispatch({ type: CART_RESET });
};

export const newOrder = (orderItem, paymentInfo) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_REQUEST });
    const config = { headers: { 'Content-type': 'application/json' } };
    const { data } = await axios.post(
      '/api/v1/order/new',
      { orderItem, paymentInfo },
      config
    );
    dispatch({ type: NEW_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const loadingTrue = () => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
};
export const loadingFalse = () => async (dispatch) => {
  dispatch({ type: LOADING_FALSE });
};

export const resetOrderState = () => async (dispatch) => {
  dispatch({ type: NEW_ORDER_RESET });
};
