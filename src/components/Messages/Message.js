import React from "react";
import moment from "moment";
import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentMetadata,
  CommentText,
} from "semantic-ui-react";

const Message = ({ message, user }) => {
  const isOwnComment = () => {
    return message.user.id === user.uid ? "message__self" : "";
  };

  const timeFromNow = (timeStamp) => moment(timeStamp).fromNow();

  return (
    <Comment>
      <CommentAvatar src={user.photoURL} />
      <CommentContent className={isOwnComment()}>
        <CommentAuthor as="a">{message.user.name}</CommentAuthor>
        <CommentMetadata>{timeFromNow(message.timestamp)}</CommentMetadata>
        <CommentText>{message.content}</CommentText>
      </CommentContent>
    </Comment>
  );
};

export default Message;
