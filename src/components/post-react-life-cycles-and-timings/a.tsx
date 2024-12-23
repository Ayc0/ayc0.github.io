import * as React from "react";

import { createFrame } from "./frame";

const { console, useConsole, Frame } = createFrame();

// ---

function Component() {
  const { console, setNode } = useConsole();

  console.log("render");

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect");
    return () => {
      console.log("useLayoutEffect cleanup");
    };
  });

  React.useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("useEffect cleanup");
    };
  });

  return (
    <div
      ref={(node) => {
        setNode(node);
        console.log("ref");
      }}
    >
      Hello
    </div>
  );
}

// ---

export function A() {
  const [state, setState] = React.useState<null | Record<string, unknown>>(
    null,
  );

  return (
    <Frame>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBlock: "1rem",
        }}
      >
        <button
          disabled={!!state}
          onClick={() => {
            console.clear();
            setState({});
          }}
        >
          Mount
        </button>

        <button
          disabled={!state}
          onClick={() => {
            console.clear();
            setState({});
          }}
        >
          Re-render
        </button>

        <button
          disabled={!state}
          onClick={() => {
            console.clear();
            setState(null);
          }}
        >
          Unmount
        </button>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--sl-color-gray-5)",
          padding: "1rem",
          minHeight: "4rem",
        }}
      >
        {state ? <Component /> : null}
      </div>
    </Frame>
  );
}
