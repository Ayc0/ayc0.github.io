import * as React from "react";
import { animationFrame, log, microTask, task } from "./tasks";
import { flushSync } from "react-dom";
import { DisplayHideButton } from "./DisplayHideButton";

let includeFlushSync = false;

export function Rerender() {
  return (
    <>
      <DisplayHideButton label="re-render in useEffect">
        <RerenderInUseEffect />
      </DisplayHideButton>

      <DisplayHideButton
        style={{ marginTop: "1em" }}
        label="re-render in render"
      >
        <RerenderInRender />
      </DisplayHideButton>

      <DisplayHideButton style={{ marginTop: "1em" }} label="re-render timings">
        <button
          onClick={(event) => {
            includeFlushSync = !includeFlushSync;
            event.currentTarget.innerHTML = includeFlushSync
              ? "Disable flushSync"
              : "Enable flushSync";
          }}
          dangerouslySetInnerHTML={{ __html: "Enable flushSync" }}
        />
        <MultipleRerenderTimingsFunction />
        <MultipleRerenderTimingsClass />
      </DisplayHideButton>
    </>
  );
}

function RerenderInUseEffect() {
  const [, forceUpdate] = React.useState({});

  log("render");

  React.useEffect(() => {
    log("mount that has a re-render");
    forceUpdate({});
  }, []);

  React.useEffect(() => {
    log("effect with no side effects");
  });

  return "✅";
}

function RerenderInRender() {
  const [count, setCount] = React.useState(0);

  log("%crender parent", { style: "color:green" });

  if (count < 2) {
    setCount(count + 1);
  }

  React.useLayoutEffect(() => {
    log("%cuseLayoutEffect parent", { style: "color:green" });
  });
  React.useEffect(() => {
    log("%cuseEffect parent", { style: "color:green" });
  });

  return (
    <div
      ref={(node) =>
        log(`%cref ${node ? "node" : "null"}`, { style: "color:green" })
      }
    >
      <RerenderInRenderChild />
    </div>
  );
}
function RerenderInRenderChild() {
  log("%crender child", { style: "color:blue" });
  React.useLayoutEffect(() => {
    log("%cuseLayoutEffect child", { style: "color:blue" });
  });
  React.useEffect(() => {
    log("%cuseEffect child", { style: "color:blue" });
  });
  return "✅";
}

function MultipleRerenderTimingsFunction() {
  const [a, setA] = React.useState(1);
  const [b, setB] = React.useState(1);

  console.log("render", { a, b });

  const update = () => {
    console.clear();
    log("click (before re-renders)", { tasks: true });
    if (includeFlushSync) {
      flushSync(() => setA((a) => a + 1));
      log("click (between re-renders, after flushSync)", { tasks: true });
    } else {
      setA((a) => a + 1);
      log("click (between re-renders)", { tasks: true });
    }
    setB((b) => b + 1);
    log("click (after re-renders)", { tasks: true });
  };

  return (
    <div>
      <div>Function:</div>
      <button onClick={update}>onClick</button>
      <button onClick={() => microTask(update)}>Micro task</button>
      <button onClick={() => task(update)}>Task</button>
      <button onClick={() => animationFrame(update)}>Animation frame</button>
    </div>
  );
}

class MultipleRerenderTimingsClass extends React.Component<
  {},
  { a: number; b: number }
> {
  override state = { a: 1, b: 1 };

  update = () => {
    console.clear();
    log("click (before re-renders)", { tasks: true });

    if (includeFlushSync) {
      flushSync(() =>
        this.setState(
          (s) => ({ ...s, a: s.a + 1 }),
          () => {
            log("Set state for a is done");
          }
        )
      );
      log("click (between re-renders, after flushSync)", { tasks: true });
    } else {
      this.setState(
        (s) => ({ ...s, a: s.a + 1 }),
        () => {
          log("Set state for a is done");
        }
      );
      log("click (between re-renders)", { tasks: true });
    }

    this.setState(
      (s) => ({ ...s, b: s.b + 1 }),
      () => {
        log("Set state for b is done");
      }
    );
    log("click (after re-renders)", { tasks: true });
  };

  override render() {
    console.log("render", this.state);

    return (
      <div>
        <div>Class:</div>
        <button onClick={this.update}>onClick</button>
        <button onClick={() => microTask(this.update)}>Micro task</button>
        <button onClick={() => task(this.update)}>Task</button>
        <button onClick={() => animationFrame(this.update)}>
          Animation frame
        </button>
      </div>
    );
  }
}
