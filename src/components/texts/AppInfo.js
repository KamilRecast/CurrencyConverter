import InfoIcon from "@mui/icons-material/Info";
import React from "react";

export function Info(props) {
  return (
    <div className="App-info">
      <InfoIcon style={{ padding: "5px" }} />
      <span className="App-info-span">{props.children}</span>
    </div>
  );
}
