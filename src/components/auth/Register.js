import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loadingUser, setError } from "../../store/actions/auth";

const Register = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const error = useSelector((state) => state.auth.error);
  const { username, email, password, passwordConfirmation } = formData;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      dispatch(setError("Passwords do not match!"));
      return;
    }
    const nameInvalid = username.length < 4;
    if (nameInvalid) {
      dispatch(setError("Username must contain 4 or more characters!"));
      return;
    }
    const notValid = [email, password, passwordConfirmation].some((el) => el.length < 6);
    if (notValid) {
      dispatch(
        setError(
          "Please fill in the passwords correctly. Each field needs to contain 6 characters or more!"
        )
      );

      return;
    }
    dispatch(loadingUser());
    dispatch(registerUser(email, password, username));
    dispatch(setError(null));
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="App">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange"></Icon>
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={(e) => handleSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              required={true}
              type="text"
              name="username"
              className={error && error.toLowerCase().includes("username") ? "error" : ""}
              minLength={4}
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              required={true}
              minLength={6}
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              required={true}
              minLength={6}
              type="password"
              name="password"
              className={error && error.toLowerCase().includes("password") ? "error" : ""}
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="repeat"
              iconPosition="left"
              required={true}
              minLength={6}
              type="password"
              name="passwordConfirmation"
              className={error && error.toLowerCase().includes("password") ? "error" : ""}
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => handleChange(e)}
            />
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              fluid
              color="orange"
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {error && error.length > 0 && (
          <Message error>
            <h3>Error</h3>
            <p>{error}</p>
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
