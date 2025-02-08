// import { instrument, secure } from "bippy"; // must be imported BEFORE react
import * as React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import type { Fiber } from "bippy";
// import { getMutatedHostFibers, instrument, secure, type Fiber } from "bippy";
import { getFiberData /* , getRoot */ } from "./fiber";
import { getErrorStackFromInfo } from "./error";

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

const button = document.getElementById("button") as HTMLButtonElement;

button.addEventListener("click", () => {
  createRoot(document.getElementById(`node`)!, {
    onCaughtError(_error, errorInfo) {
      // @ts-expect-error
      const fiber = errorInfo.errorBoundary?._reactInternals as
        | Fiber
        | undefined;

      // TODO: even with displayName, getErrorStackFromInfo(errorInfo) can use the minified version. Why may want to go through the fiber manually to match the error stack
      console.log("Error caught by Error Boundary", {
        boundaryStack: fiber ? getFiberData(fiber).fiberStack : null,
        errorStack: getErrorStackFromInfo(errorInfo),
      });

      // console.log("onCaughtError", {
      // error,
      // errorInfo,
      // fiber,
      // // mutated: getMutatedHostFibers(fiber),
      // root: getRoot(fiber),
      // updatedNode: getRoot(fiber)
      //   .pendingUpdatersLaneMap.flatMap((lane) => [...lane])
      //   .map(getFiberData),
      // mutatedRoot: getMutatedHostFibers(getRoot(fiber)),
      // fiberData: getFiberData(fiber),
      // returnData: getFiberData(fiber.return),
      // });
      // console.dir(error);
      // console.dir(errorInfo);
    },

    onUncaughtError(error, errorInfo) {
      // console.log("onUncaughtError", { error, errorInfo });
      console.log("Error not caught by Error Boundary", {
        errorStack: getErrorStackFromInfo(errorInfo),
        error,
      });
    },

    onRecoverableError(error, errorInfo) {
      console.log("Recoverable error", {
        errorStack: getErrorStackFromInfo(errorInfo),
        error,
      });
    },
  }).render(<App />);
  button.disabled = true;
});
