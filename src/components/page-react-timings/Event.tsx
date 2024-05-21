import * as React from "react";
import { log } from "./tasks";

export function Event() {
  return (
    <>
      <button
        onClickCapture={() => {
          console.clear();
          log("from onClickCapture", { tasks: true });
        }}
        onClick={() => {
          log("from onClick", { tasks: true });
        }}
      >
        Click me
      </button>
    </>
  );
}
