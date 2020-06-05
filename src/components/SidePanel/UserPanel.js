import React from "react";
import {
  Grid,
  GridColumn,
  GridRow,
  Header,
  HeaderContent,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { loadingUser } from "../../store/actions/auth";
import firebase from "../../firebase";
import Spinner from "../UI/Spinner";

const UserPanel = () => {
  const { loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{user && user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: (
        <span
          onClick={() => {
            dispatch(loadingUser());
            firebase
              .auth()
              .signOut()
              .then((res) => {})
              .catch((err) => {
                console.log(err);
                dispatch(loadingUser(false));
              });
          }}
        >
          Sign Out
        </span>
      ),
    },
  ];

  return loading && !user ? (
    <Spinner />
  ) : (
    <Grid style={{ background: "#4c3c4c" }}>
      <GridColumn>
        <GridRow style={{ padding: "1.2em", margin: "0" }}>
          {/** App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <HeaderContent>DevChat</HeaderContent>
          </Header>
        </GridRow>
        {/** User dropdown */}
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown trigger={<span>{user && user.displayName}</span>} options={dropdownOptions()} />
        </Header>
      </GridColumn>
    </Grid>
  );
};

export default UserPanel;
