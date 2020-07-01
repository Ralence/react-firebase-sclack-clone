import {
  LOGOUT_USER,
  ADD_CHANNEL,
  SET_CHANNELS,
  SET_CURRENT_CHANNEL,
  SET_MSG_ERROR,
  LOADING_MSGS,
  SET_CURRENT_MESSAGES,
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  SET_PRIVATE_CHANNEL,
} from "../actions/types";

const initialState = {
  channels: null,
  currentChannel: null,
  currentMessages: [],
  loading: true,
  error: null,
  messageSearchTerm: "",
  isPrivateChannel: false,
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
        isPrivateChannel: false,
      };
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload,
        loading: false,
        error: null,
        isPrivateChannel: false,
      };
    case SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload,
      };
    case SET_CURRENT_MESSAGES:
      return {
        ...state,
        currentMessages: payload,
        loading: false,
        error: null,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        messageSearchTerm: payload,
      };
    case CLEAR_SEARCH_TERM:
      return {
        ...state,
        messageSearchTerm: "",
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
