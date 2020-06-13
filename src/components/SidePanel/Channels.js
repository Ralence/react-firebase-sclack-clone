import React, { useState, Fragment, useEffect } from "react";
import firebase from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import { addChannel, setChannels, setCurrentChannel } from "../../store/actions/messages";

const ChannelList = () => {
  const channels = useSelector((state) => state.messages.channels);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {channels.map((channel) => {
        return (
          <MenuItem
            key={channel.id}
            onClick={() => dispatch(setCurrentChannel(channel))}
            name={channel.name}
            style={{ opacity: "0.7" }}
          >
            # {channel.name}
          </MenuItem>
        );
      })}
    </Fragment>
  );
};

const Channels = () => {
  const channels = useSelector((state) => state.messages.channels);
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    channelDetails: "",
  });
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const { channelName, channelDetails } = formData;

  useEffect(() => {
    const channelsRef = firebase.database().ref("channels");
    const loadedChannels = [];

    channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      dispatch(setChannels(loadedChannels));
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const channelsRef = firebase.database().ref("channels");
    if (isFormValid(channelName, channelDetails)) {
      dispatch(addChannel(formData, currentUser, channelsRef));
      setFormData({
        channelName: "",
        channelDetails: "",
      });
      setModal(false);
    } else {
      alert("Please fill out all the fields!");
    }
  };

  const isFormValid = (channelName, channelDetails) => {
    return channelName.length > 2 && channelDetails.length > 2;
  };

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <MenuItem>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels ? channels.length : "0"}) <Icon name="add" onClick={() => setModal(true)} />
        </MenuItem>
        {channels && channels.length > 0 && <ChannelList />}
      </Menu.Menu>
      <Modal basic open={showModal} onClose={() => setModal(false)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Field>
              <Input
                fluid
                type="text"
                minLength={3}
                required={true}
                label="Name of Channel"
                name="channelName"
                value={channelName}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                type="text"
                required={true}
                minLength={3}
                label="Channel Details"
                name="channelDetails"
                value={channelDetails}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={(e) => handleSubmit(e)}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button
            color="red"
            inverted
            onClick={() => {
              setModal(false);
              setFormData({
                channelName: "",
                channelDetails: "",
              });
            }}
          >
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default Channels;
