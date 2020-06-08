import React, { useState, Fragment } from "react";
import { Menu, MenuItem, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [showModal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    channelDetails: "",
  });

  const { channelName, channelDetails } = formData;

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
          <Form>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                value={channelName}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="Channel Details"
                name="channelDetails"
                value={channelDetails}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
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
