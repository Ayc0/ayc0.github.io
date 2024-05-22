import * as React from "react";
import { log } from "./tasks";
import { DisplayHideButton } from "./DisplayHideButton";

const C = React.createContext(0);

export function Context() {
  return (
    <DisplayHideButton label="re-render through Context">
      <Provider>
        <PassThrough>
          <Child />
        </PassThrough>
      </Provider>
    </DisplayHideButton>
  );
}

function Provider({ children }: { children?: React.ReactNode }) {
  const [state, setState] = React.useState(0);
  const [, setOtherState] = React.useState({});
  log("render Provider", { tasks: true });
  return (
    <div style={{ padding: 2, border: "2px solid red" }}>
      Provider
      <div>
        <button
          onClick={() => {
            log("re-render Provider", { tasks: true });
            setState((v) => v + 1);
          }}
        >
          Update context
        </button>
        <button
          style={{ marginBottom: "0.5em" }}
          onClick={() => setOtherState({})}
        >
          Update local state
        </button>
      </div>
      <C.Provider value={state}>{children}</C.Provider>
    </div>
  );
}

const PassThrough = React.memo(
  ({ children }: { children?: React.ReactNode }) => {
    log("render PassThrough");
    return (
      <div style={{ padding: 2, border: "2px solid green" }}>
        <div>PassThrough</div>
        {children}
      </div>
    );
  }
);

const Child = React.memo(() => {
  log("render Child");
  const value = React.useContext(C);
  return (
    <div style={{ padding: 2, border: "2px solid blue" }}>Child {value}</div>
  );
});
