import React from "react";

import { render } from "react-dom";
// import { createRoot } from "react-dom/client";

import { App } from "./App";
import Switcher, { isLegacyRoot } from "./Switcher";

const rootElement = document.getElementById("root")!;

render(<App />, rootElement);
// if (isLegacyRoot) {
// } else {
// const root = createRoot(rootElement);
// root.render(<App />);
// }

{
  // const root = createRoot(document.getElementById("switcher")!);
  // root.render(<Switcher />);
  render(<Switcher />, document.getElementById("switcher")!);
}
