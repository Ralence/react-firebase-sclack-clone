import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, MenuMenu, MenuItem } from "semantic-ui-react";

import firebase from "../../firebase";

class DirectMessages extends Component {
  state = {
    users: [],
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.addListeners(this.props.currentUser.uid);
    }
  }

  addListeners = (currentUserUid) => {
    const loadedUsers = [];

    this.state.usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        const user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";

        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });

    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);

        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });

    this.state.presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        // Add online status to user
        this.addStatusToUser(snap.key);
      }
    });

    this.state.presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        // Remove online status to user
        this.addStatusToUser(snap.key, false);
      }
    });
  };

  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (userId === user.uid) {
        user["status"] = connected ? "online" : "offline";
      }
      return acc.concat(user);
    }, []);

    this.setState({ users: updatedUsers });
  };
  render() {
    const { users } = this.state;
    return (
      <MenuMenu className="menu">
        <MenuItem>
          <span>
            <Icon name="mail" />
            DIRECT MESSAGES
          </span>
        </MenuItem>
        {users.map((user) => {
          console.log(user);
          return (
            <MenuItem key={user.uid} style={{ opacity: 0.7, fontStyle: "italic" }}>
              <Icon name="circle" color={user.status === "online" ? "green" : "red"} />@ {user.name}
            </MenuItem>
          );
        })}
      </MenuMenu>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

export default connect(mapStateToProps)(DirectMessages);
