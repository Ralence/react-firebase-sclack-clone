import firebase from "../../firebase";
import md5 from "md5";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_ERROR,
} from "./types";

export const registerUser = (email, password, username) => async (dispatch) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);

    await res.user.updateProfile({
      displayName: username,
      photoURL: `http://gravatar.com/avatar/${md5(res.user.email)}?d=identicon`,
    });

    const usersRef = firebase.database().ref("users");

    await usersRef.child(res.user.uid).set({
      name: res.user.displayName,
      avatar: res.user.photoURL,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.user,
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
    dispatch({
      type: REGISTER_FAIL,
      payload: err.message,
    });
  }
};

export const loadingUser = () => ({
  type: LOADING_USER,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const setError = (error) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  });
};
