import React from "react";
import { Menu, Icon, MenuMenu, MenuItem } from "semantic-ui-react";

const DirectMessages = () => {
  return (
    <MenuMenu className="menu">
      <MenuItem>
        <span>
          <Icon name="mail" />
          DIRECT MESSAGES
        </span>
      </MenuItem>
    </MenuMenu>
  );
};

export default DirectMessages;
