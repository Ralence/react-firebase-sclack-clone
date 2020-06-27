import React from "react";
import { useSelector } from "react-redux";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

const MessagesHeader = ({ handleSearchChange, searchLoading }) => {
  const { name } = useSelector(
    (state) =>
      state &&
      state.messages &&
      state.messages.currentChannel !== null &&
      state.messages.currentChannel
  );

  const currentUser = useSelector(
    (state) => state && state.auth && state.auth.user && state.auth.user
  );

  const searchTerm = useSelector((state) => state.messages.messageSearchTerm);

  const loadedMessages = useSelector(
    (state) =>
      state && state.messages && state.messages.currentMessages && state.messages.currentMessages
  );

  const countUniqueUsers = (messages) => {
    if (messages.length > 0) {
      const uniqueUsers = messages.reduce((acc, message) => {
        if (!acc.includes(currentUser.displayName)) {
          acc.push(currentUser.displayName);
        }
        if (!acc.includes(message.user.name)) {
          acc.push(message.user.name);
        }
        return acc;
      }, []);
      return uniqueUsers.length;
    } else {
      return 1;
    }
  };

  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header as="h2" floated="left" style={{ marginBottom: "0" }}>
        <span>
          {name ? `# ${name}` : "#"}
          <Icon name="star outline" color="black" />
        </span>
        <HeaderSubHeader>{`${countUniqueUsers(loadedMessages)} user${
          countUniqueUsers(loadedMessages) === 1 ? "" : "s"
        }`}</HeaderSubHeader>
      </Header>
      {/* Channel Search*/}
      <Header floated="right">
        <Input
          loading={searchLoading}
          size="mini"
          icon="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search Messages"
          onChange={(e) => handleSearchChange(e)}
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
