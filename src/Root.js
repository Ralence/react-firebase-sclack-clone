import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import App from "./components/App";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import firebase from "./firebase";
import { logoutUser } from "./store/actions/auth";
import { LOGIN_SUCCESS } from "./store/actions/types";

const Root = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user === null) dispatch(logoutUser());
      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
        history.push("/");
      }
    });
  }, [history, dispatch]);
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Root;
