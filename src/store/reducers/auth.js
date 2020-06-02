import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
      return {
        user: null,
        loading: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
