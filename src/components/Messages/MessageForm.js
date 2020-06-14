import React from "react";
import { Segment, Button, Input, ButtonGroup } from "semantic-ui-react";

const MessageForm = () => {
  return (
    <Segment className="messages__form">
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7rem" }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write your message..."
      />
      <ButtonGroup icon widths="2">
        <Button color="orange" content="Add Reply" labelPosition="left" icon="edit" />
        <Button color="teal" compact="Upload Media" labelPosition="right" icon="upload media" />
      </ButtonGroup>
    </Segment>
  );
};

export default MessageForm;
