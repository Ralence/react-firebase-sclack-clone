import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import "./App.css";

function App() {
  return (
    <Grid columns="equal" className="App" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel />
      <GridColumn style={{ marginLeft: 320 }}>
        <Messages />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPanel />
      </GridColumn>
    </Grid>
  );
}

export default App;
