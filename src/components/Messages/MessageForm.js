import React, { useState } from "react";
import { Segment, Button, Input, ButtonGroup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { setMsgError, setLoadingMsgs } from "../../store/actions/messages";
import firebase from "../../firebase";
import FileModal from "./FileModal";

const MessageForm = () => {
  const [modal, openModal] = useState(false);

  const { currentChannel, error, loading } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const messagesRef = firebase.database().ref("messages");

  const createMessage = () => ({
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    content: message,
    user: {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    },
  });

  const sendMessage = () => {
    if (message) {
      dispatch(setLoadingMsgs(true));

      messagesRef
        .child(currentChannel.id)
        .push()
        .set(createMessage())
        .then((res) => {
          dispatch(setLoadingMsgs(false));
          setMessage("");
          dispatch(setMsgError(null));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          dispatch(setLoadingMsgs(false));
          sendMessage("");
          dispatch(setMsgError(err));
        });
    } else {
      dispatch(setMsgError({ message: "Add a Message!" }));
    }
  };

  const uploadFile = (file, metadata) => {
    console.log(file, metadata);
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        type="text"
        name="message"
        style={{ marginBottom: "0.7rem" }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write your message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (error) dispatch(setMsgError(null));
        }}
        className={error ? "error" : ""}
      />
      <ButtonGroup icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          disabled={loading}
          onClick={() => {
            sendMessage();
          }}
        />
        <Button
          color="teal"
          content="Upload Media"
          labelPosition="right"
          icon="upload cloud"
          disabled={loading}
          onClick={() => openModal(true)}
        />
        <FileModal modal={modal} closeModal={() => openModal(false)} uploadFile={uploadFile} />
      </ButtonGroup>
    </Segment>
  );
};

export default MessageForm;
