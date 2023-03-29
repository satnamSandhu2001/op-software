import axios from 'axios';
import {
  CLEAR_ERRORS,
  GET_ALL_SOFTWARE_FAIL,
  GET_ALL_SOFTWARE_REQUEST,
  GET_ALL_SOFTWARE_SUCCESS,
} from '../constants/softwareConstant';

export const getSoftwares = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SOFTWARE_REQUEST });
    const { data } = await axios.get('/api/v1/subscriptions');
    dispatch({ type: GET_ALL_SOFTWARE_SUCCESS, payload: data.subscriptions });
  } catch (error) {
    dispatch({
      type: GET_ALL_SOFTWARE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
