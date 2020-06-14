import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

const MessagesHeader = () => {
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid={true} as="h2" floated="left" style={{ marginBottom: "0" }}>
        <span>
          Channel
          <Icon name="star outline" color="black" />
        </span>
        <HeaderSubHeader>2 users</HeaderSubHeader>
      </Header>
      {/* Channel Search*/}
      <Header floated="right">
        <Input size="mini" icon="search" name="searchTerm" placeholder="Search Messages" />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
