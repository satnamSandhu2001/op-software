import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  CART_RESET,
  CLEAR_ERRORS,
  LOADING_FALSE,
  LOADING_TRUE,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_RESET,
  NEW_ORDER_SUCCESS,
} from '../constants/orderConstants';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        newOrderSuccess: action.payload,
      };
    case NEW_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        newOrderSuccess: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case NEW_ORDER_RESET:
      return {
        ...state,
        error: null,
        newOrderSuccess: null,
      };
    case LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case CART_RESET:
      return {
        ...state,
        cart: null,
      };
    default:
      return state;
  }
};
