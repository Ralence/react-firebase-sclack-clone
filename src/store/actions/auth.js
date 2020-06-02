import firebase from "../../firebase";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);

    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
