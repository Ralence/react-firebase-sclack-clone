import firebase from "../../firebase";
import { ADD_CHANNEL } from "./types";

export const addChannel = (formData, user) => async (dispatch) => {
  const { channelName, channelDetails } = formData;
  const channelsRef = firebase.database().ref("channels");

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
    .update(newChannel, (data) => {
      console.log("data", data);
    })
    .catch((err) => {
      console.log(err);
    });
};
