import {
  SET_CHANNELS,
  SET_CURRENT_CHANNEL,
  SET_MSG_ERROR,
  LOADING_MSGS,
  SET_CURRENT_MESSAGES,
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  SET_PRIVATE_CHANNEL,
} from "./types";

export const addChannel = (formData, user, channelsRef) => async (dispatch) => {
  const { channelName, channelDetails } = formData;

  const key = (await channelsRef.push()).key;

  const newChannel = {
    id: key,
    name: channelName,
    details: channelDetails,
    createdBy: {
      user: user.displayName,
      avatar: user.photoURL,
    },
  };

  channelsRef
    .child(key)
    .update(newChannel, (data) => {})
    .catch((err) => {
      console.log(err);
      dispatch(setMsgError(err));
    });
};

export const setChannels = (channels) => ({
  type: SET_CHANNELS,
  payload: channels,
});

export const setCurrentChannel = (selectedChannel) => ({
  type: SET_CURRENT_CHANNEL,
  payload: selectedChannel,
});

export const setPrivateChannel = (isPrivateChannel) => ({
  type: SET_PRIVATE_CHANNEL,
  payload: isPrivateChannel,
});

export const setSearchMsgTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});

export const clearSearchMsgTerm = () => ({
  type: CLEAR_SEARCH_TERM,
});

export const setMsgError = (error = null) => ({
  type: SET_MSG_ERROR,
  payload: error,
});

export const setLoadingMsgs = (loading = false) => ({
  type: LOADING_MSGS,
  payload: loading,
});

export const setCurrentMessages = (messages) => ({
  type: SET_CURRENT_MESSAGES,
  payload: messages,
});
