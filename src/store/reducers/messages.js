import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_ERROR,
  LOGOUT_USER,
  ADD_CHANNEL,
  SET_CHANNELS,
  SET_CURRENT_CHANNEL,
} from "../actions/types";

const initialState = {
  channels: null,
  currentChannel: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHANNEL:
    case SET_CHANNELS:
      return {
        ...state,
        channels: [...payload],
        loading: false,
        error: null,
      };
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload,
        loading: false,
        error: null,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
