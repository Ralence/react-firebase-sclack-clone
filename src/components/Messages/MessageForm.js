import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Segment, Button, Input, ButtonGroup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { setMsgError, setLoadingMsgs } from "../../store/actions/messages";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

const MessageForm = () => {
  const [modal, openModal] = useState(false);

  const [uploadState, setUploadState] = useState("");
  const [percentUploaded, setPercentUploaded] = useState(0);

  const storageRef = firebase.storage().ref();

  const { currentChannel, error, loading, isPrivateChannel } = useSelector(
    (state) => state.messages
  );
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const messagesRef = firebase.database().ref("messages");

  const createMessage = (fileURL = null) => ({
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    content: !fileURL ? message : null,
    image: fileURL || null,
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

  const sendFileMessage = (fileURL, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(createMessage(fileURL))
      .then(() => {
        // TODO set state to 'done'
        setUploadState("done");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMsgError(err));
        setUploadState("error");
      });
  };

  const getPath = () => {
    if (isPrivateChannel) {
      return `chat/private-${currentChannel.id}`;
    } else {
      return "chat/public";
    }
  };

  const uploadFile = (file, metadata) => {
    const pathToUpload = currentChannel.id;
    let uploadTask = null;

    const filePath = `${getPath()}/${uuidv4()}.jpeg`;

    setUploadState("uploading");
    uploadTask = storageRef.child(filePath).put(file, metadata);

    uploadTask.on(
      "state_changed",
      (snap) => {
        const percentOfFileUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setPercentUploaded(percentOfFileUploaded);
      },
      (err) => {
        console.log(err);
        dispatch(setMsgError(err));
        setUploadState("error");
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            sendFileMessage(downloadURL, messagesRef, pathToUpload);
          })
          .catch((err) => {
            dispatch(setMsgError(err));
            setUploadState("error");
          });
      }
    );
  };

  return (
    <Segment className="message__form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
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
            disabled={uploadState === "uploading" || loading}
            content="Upload Media"
            labelPosition="right"
            icon="upload cloud"
            onClick={() => openModal(true)}
          />
          <FileModal modal={modal} closeModal={() => openModal(false)} uploadFile={uploadFile} />
        </ButtonGroup>
        <ProgressBar uploadState={uploadState} percentUploaded={percentUploaded} />
      </form>
    </Segment>
  );
};

export default MessageForm;
