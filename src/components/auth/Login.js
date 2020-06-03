import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadingUser, setError } from "../../store/actions/auth";

const Login = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const error = useSelector((state) => state.auth.error);
  const { email, password } = formData;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const notValid = [email, password].some((el) => el.length < 6);
    if (notValid) {
      dispatch(
        setError(
          "Please fill in the passwords correctly. Each field needs to contain 6 characters or more!"
        )
      );
      return;
    }
    dispatch(loadingUser());
    dispatch(loginUser(email, password));
    dispatch(setError(null));
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="App">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet"></Icon>
          Login to DevChat
        </Header>
        <Form size="large" onSubmit={(e) => handleSubmit(e)}>
          <Segment stacked>
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
            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              fluid
              color="violet"
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
          Don't have an account? <Link to="/register">register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
