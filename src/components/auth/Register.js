import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { username, email, password, passwordConfirmation } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="App">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange"></Icon>
          Register for DevChat
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
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
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="repeat"
              iconPosition="left"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => handleChange(e)}
            />
            <Button fluid color="orange" size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
