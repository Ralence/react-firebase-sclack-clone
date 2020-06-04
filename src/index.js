import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import firebase from "./firebase";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "semantic-ui-css/semantic.min.css";

// Redux Store
import { Provider } from "react-redux";
import store from "./store";

const Root = () => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
      }
    });
  }, [history]);
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
