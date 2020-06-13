import { SET_CHANNELS, SET_CURRENT_CHANNEL } from "./types";

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
