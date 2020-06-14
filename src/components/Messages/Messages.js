import React, { Fragment } from "react";
import { Segment, Comment, CommentGroup } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";

const Messages = () => {
  return (
    <Fragment>
      <Segment>
        <MessagesHeader />
        <CommentGroup className="messages">Messages</CommentGroup>
      </Segment>
    </Fragment>
  );
};

export default Messages;
