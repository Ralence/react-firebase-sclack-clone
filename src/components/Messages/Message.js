import React from "react";
import moment from "moment";
import {
  Comment,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentMetadata,
  CommentText,
  Image,
} from "semantic-ui-react";

const Message = ({ message, user }) => {
  const isOwnComment = () => {
    return message.user.id === user.uid ? "message__self" : "";
  };

  const timeFromNow = (timeStamp) => moment(timeStamp).fromNow();

  return (
    <Comment>
      <CommentAvatar src={message.user.avatar} />
      <CommentContent className={isOwnComment()}>
        <CommentAuthor as="a">{message.user.name}</CommentAuthor>
        <CommentMetadata>{timeFromNow(message.timestamp)}</CommentMetadata>
        {message && message.image ? (
          <Image src={message.image} className="message__image" />
        ) : (
          <CommentText>{message.content}</CommentText>
        )}
      </CommentContent>
    </Comment>
  );
};

export default Message;
