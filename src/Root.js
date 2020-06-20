import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import App from "./components/App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import firebase from "./firebase";
import { logoutUser } from "./store/actions/auth";
import { LOGIN_SUCCESS } from "./store/actions/types";
import Spinner from "./components/UI/Spinner";

const Root = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user === null) {
        dispatch(logoutUser());
        history.push("/login");
      }
      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
        history.push("/");
      }
    });
  }, [history, dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Root;
