import {
  LOGOUT_USER,
  ADD_CHANNEL,
  SET_CHANNELS,
  SET_CURRENT_CHANNEL,
  SET_MSG_ERROR,
  LOADING_MSGS,
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
    case SET_MSG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOADING_MSGS:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
