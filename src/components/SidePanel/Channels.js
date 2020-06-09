import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import { addChannel } from "../../store/actions/messages";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    channelDetails: "",
  });
  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const { channelName, channelDetails } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid(channelName, channelDetails)) {
      dispatch(addChannel(formData, currentUser));
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
          ({channels.length}) <Icon name="add" onClick={() => setModal(true)} />
        </MenuItem>
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
