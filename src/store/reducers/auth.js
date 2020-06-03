import { REGISTER_SUCCESS, REGISTER_FAIL, LOADING_USER } from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
      return {
        user: null,
        loading: false,
        isAuthenticated: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
