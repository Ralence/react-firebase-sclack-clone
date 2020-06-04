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

const UserPanel = () => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
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
      text: <span>Sign Out</span>,
    },
  ];

  return (
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
          <Dropdown trigger={<span>User</span>} options={dropdownOptions()} />
        </Header>
      </GridColumn>
    </Grid>
  );
};

export default UserPanel;
