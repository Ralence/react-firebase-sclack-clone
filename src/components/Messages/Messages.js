import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, CommentGroup, Loader, Dimmer, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import {
  setCurrentMessages,
  setLoadingMsgs,
  setCurrentChannel,
} from "../../store/actions/messages";

const Messages = () => {
  const user = useSelector((state) => state.auth.user);
  const { currentChannel, currentMessages, loading } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    const messagesRef = firebase.database().ref("messages");
    dispatch(setCurrentMessages([]));
    if (currentChannel && user) {
      const loadedMessages = [];
      messagesRef.child(currentChannel.id).on("child_added", (snap) => {
        dispatch(setLoadingMsgs(true));
        loadedMessages.push(snap.val());
        console.log(loadedMessages);
        dispatch(setCurrentMessages(loadedMessages));
        dispatch(setLoadingMsgs(false));
      });
    }
    return () => (cleanup) => messagesRef.off();
  }, [currentChannel, user, dispatch]);

  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <CommentGroup className="messages">
          {loading && (
            <Fragment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>

              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Fragment>
          )}
          {currentMessages && currentMessages.length
            ? currentMessages.map((msg) => (
                <Message key={msg.timestamp} message={msg} user={user} />
              ))
            : "Start Chatting..."}
        </CommentGroup>
      </Segment>
      <MessageForm />
    </Fragment>
  );
};

export default Messages;
