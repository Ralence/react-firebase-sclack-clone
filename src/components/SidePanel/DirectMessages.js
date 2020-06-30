import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon, MenuMenu, MenuItem } from "semantic-ui-react";

import firebase from "../../firebase";

const DirectMessages = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);

  const usersRef = firebase.database().ref("users");
  const connectedRef = firebase.database().ref(".info/connected");
  const presenceRef = firebase.database().ref("presence");

  const addListeners = (currentUserUid) => {
    const loadedUsers = [];

    usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        const user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";

        loadedUsers.push(user);
        setUsers(loadedUsers);
      }
    });

    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid);

        ref.set(true);
        ref.onDisconnect((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });

    presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        // Add online status to user
        addStatusToUser(snap.key);
      }
    });

    presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        // Remove online status to user
        addStatusToUser(snap.key, false);
      }
    });
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = users.map((user) => {
      if (user.uid === userId) {
        user["status"] = connected ? "online" : "offline";
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  useEffect(() => {
    if (currentUser) {
      addListeners(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <MenuMenu className="menu">
      <MenuItem>
        <span>
          <Icon name="mail" />
          DIRECT MESSAGES
        </span>
      </MenuItem>
      {users.map((user) => {
        return (
          <MenuItem
            key={user.uid}
            onClick={() => console.log(user)}
            style={{ opacity: 0.7, fontStyle: "italic" }}
          >
            <Icon name="circle" color={user.status === "online" ? "green" : "red"} />@ {user.name}
          </MenuItem>
        );
      })}
    </MenuMenu>
  );
};

export default DirectMessages;
