import {
  CLEAR_ERRORS,
  GET_ALL_SOFTWARE_FAIL,
  GET_ALL_SOFTWARE_REQUEST,
  GET_ALL_SOFTWARE_SUCCESS,
} from '../constants/softwareConstant';

export const softwareReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SOFTWARE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_SOFTWARE_SUCCESS:
      return {
        ...state,
        loading: false,
        softwares: action.payload,
      };
    case GET_ALL_SOFTWARE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
