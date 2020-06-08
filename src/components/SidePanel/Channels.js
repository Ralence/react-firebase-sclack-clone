import React, { useState } from "react";
import { Menu, MenuItem, Icon } from "semantic-ui-react";

const Channels = () => {
  const [channels, setChannels] = useState([1, 1, 3]);

  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <MenuItem>
        <span>
          <Icon name="exchange" /> CHANNELS
        </span>{" "}
        ({channels.length}) <Icon name="add" />
      </MenuItem>
    </Menu.Menu>
  );
};

export default Channels;
