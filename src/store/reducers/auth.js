import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_ERROR,
  LOGOUT_USER,
} from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
        error: null,
      };
    case LOGOUT_USER:
      return {
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        user: null,
        loading: false,
        isAuthenticated: false,
        error: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
