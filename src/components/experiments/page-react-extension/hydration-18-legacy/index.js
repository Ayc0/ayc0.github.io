import * as React from "react-18";
import * as ReactDOM from "react-dom-18";

ReactDOM.hydrate(
  React.createElement("div", null, "World"),
  document.getElementById("root"),
  (...args) => console.info("[CUSTOM] Hydration done", args),
);
