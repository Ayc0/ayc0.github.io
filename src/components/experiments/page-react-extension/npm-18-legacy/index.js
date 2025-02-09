// import { instrument, secure } from "bippy"; // must be imported BEFORE react
import * as React from "react-18";
import * as ReactDOM from "react-dom-18";

import { App } from "./App";
// import type { Fiber } from "bippy";
// import { getMutatedHostFibers, instrument, secure, type Fiber } from "bippy";
// import { getFiberData /* , getRoot */ } from "./fiber";
// import { getErrorStackFromInfo } from "./error";

// instrument(
//   secure({
//     onCommitFiberRoot(rendererID, root) {
//       console.log("root ready to commit", rendererID, root);
//       console.log(getMutatedHostFibers(root.current));
//     },
//     onPostCommitFiberRoot(rendererID, root) {
//       console.log("root with effects committed", rendererID, root);
//     },
//     onCommitFiberUnmount(rendererID, fiber) {
//       console.log("fiber unmounted", rendererID, fiber);
//     },
//   }),
// );

const button = document.getElementById("button");

button.addEventListener("click", () => {
  ReactDOM.render(React.createElement(App), document.getElementById(`node`));
  button.disabled = true;
});
