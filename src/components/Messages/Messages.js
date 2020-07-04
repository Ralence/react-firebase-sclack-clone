import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, CommentGroup, Loader, Dimmer, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import { setCurrentMessages, setLoadingMsgs, setSearchMsgTerm } from "../../store/actions/messages";

const Messages = () => {
  const user = useSelector((state) => state.auth.user);
  const { currentChannel, currentMessages, loading, isPrivateChannel } = useSelector(
    (state) => state.messages
  );
  const searchTerm = useSelector((state) => state.messages.messageSearchTerm);

  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchTerm) return;
    if (searchTerm && currentMessages) {
      const messages = [...currentMessages];
      const regex = new RegExp(searchTerm, "gi");
      const result = messages.reduce((acc, msg) => {
        if ((msg.content && msg.content.match(regex)) || msg.user.name.match(regex)) {
          acc.push(msg);
        }
        return acc;
      }, []);
      setSearchResult(result);
      setTimeout(() => {
        setSearchLoading(false);
      }, 800);
    }
  }, [searchTerm, currentMessages]);

  useEffect(() => {
    const messagesRef = firebase.database().ref("messages");
    const privateMessagesRef = firebase.database().ref("privateMessages");

    const messagesRefSwitch = isPrivateChannel ? privateMessagesRef : messagesRef;

    dispatch(setCurrentMessages([]));
    if (currentChannel && user) {
      const loadedMessages = [];
      messagesRefSwitch.child(currentChannel.id).on("child_added", (snap) => {
        dispatch(setLoadingMsgs(true));
        loadedMessages.push(snap.val());
        // console.log(loadedMessages);
        dispatch(setCurrentMessages(loadedMessages));
        dispatch(setLoadingMsgs(false));
      });
    }
    return () => (cleanup) => messagesRef.off();
  }, [currentChannel, user, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchMsgTerm(e.target.value));
    setSearchLoading(true);
  };

  return (
    <Fragment>
      <MessagesHeader searchLoading={searchLoading} handleSearchChange={handleSearchChange} />
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
          {searchTerm
            ? searchResult.map((msg) => <Message key={msg.timestamp} message={msg} user={user} />)
            : currentMessages && currentMessages.length
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
