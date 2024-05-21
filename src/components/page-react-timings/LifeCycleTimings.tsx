import React from "react";
import { log } from "./tasks";

const getRandomColor = () => {
  return `lch(${Math.floor(Math.random() * 20) + 50}% ${
    Math.floor(Math.random() * 50) + 50
  } ${Math.floor(Math.random() * 360)})`;
};

let i = 65;

const TimingContext = React.createContext<{
  tasks: boolean | "all";
  timings: boolean;
}>({
  tasks: false,
  timings: false,
});

class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { error: boolean }
> {
  override state = {
    error: false,
  };

  static getDerivedStateFromError() {
    return {
      error: true,
    };
  }

  override render() {
    if (this.state.error) {
      return <div style={{ border: `4px dotted red` }}>Oops</div>;
    }

    return (
      <React.Suspense
        fallback={
          <div style={{ border: `4px dotted blue`, padding: "4px" }}>⏸️</div>
        }
      >
        <div style={{ border: `2px double OrangeRed`, padding: "4px" }}>
          {this.props.children}
        </div>
      </React.Suspense>
    );
  }
}

function ErrorThrower() {
  const [hasError, setError] = React.useState(false);
  if (hasError) {
    throw new Error("oops");
  }
  return (
    <span onClick={() => setError(true)} title="throw error">
      💥
    </span>
  );
}

function Suspenser() {
  const [hasSuspense, setSuspense] = React.useState(false);
  if (hasSuspense) {
    throw new Promise((res) => {});
  }
  return (
    <span onClick={() => setSuspense(true)} title="trigger infinite suspense">
      🚧
    </span>
  );
}

function Legend() {
  const style = {
    width: "2ch",
    display: "inline-block",
    height: "0.5ex",
  };
  return (
    <>
      <div>
        <span
          style={{ ...style, borderTop: "2px solid " + getRandomColor() }}
        />{" "}
        Component
      </div>
      <div>
        <span style={{ ...style, borderTop: "2px double orangered" }} /> Error +
        Suspense boundary
      </div>
      <div>
        <span style={{ ...style, borderTop: "4px dotted red" }} /> Error was
        thrown & caught
      </div>
      <div>
        <span style={{ ...style, borderTop: "4px dotted blue" }} /> Suspense in
        progress
      </div>
    </>
  );
}

class ClassWithMetrics extends React.Component<{
  children?: React.ReactNode;
}> {
  static override contextType = TimingContext;
  declare context: React.ContextType<typeof TimingContext>;

  color = getRandomColor();
  componentId = String.fromCharCode(i++);

  boundLog(message: string) {
    log(`%cComponent ${this.componentId}: ${message}`, {
      ...this.context,
      style: `color: ${this.color}`,
    });
  }

  constructor(props: { children?: React.ReactNode }) {
    super(props);

    this.boundLog("constructor");
  }

  override componentWillMount() {
    this.boundLog("componentWillMount");
  }

  override componentWillReceiveProps() {
    this.boundLog("componentWillReceiveProps");
  }

  override componentWillUpdate() {
    this.boundLog("componentWillUpdate");
  }

  override componentDidMount() {
    this.boundLog("componentDidMount");
  }

  override componentDidUpdate() {
    this.boundLog("componentDidUpdate");
  }

  override shouldComponentUpdate() {
    this.boundLog("shouldComponentUpdate");
    return true;
  }

  override getSnapshotBeforeUpdate() {
    this.boundLog("getSnapshotBeforeUpdate");
    return "";
  }

  override componentWillUnmount() {
    this.boundLog("componentWillUnmount");
  }

  override render() {
    this.boundLog("render");
    return (
      <div
        ref={function ref(this: ClassWithMetrics, node: HTMLDivElement) {
          this.boundLog("ref " + (node ? "node" : "null"));
        }.bind(this)}
        style={{
          border: `2px solid ${this.color}`,
        }}
      >
        <div>
          {this.componentId}
          <span
            onClick={() => {
              resetConsole();
              this.forceUpdate();
            }}
            title="re-render"
          >
            🔄
          </span>
          <ErrorThrower />
          <Suspenser />
        </div>
        <div style={{ display: "grid", gridAutoFlow: "column" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class ClassWithChildrenWithMetrics extends ClassWithMetrics {
  override render() {
    this.boundLog("render");
    return (
      <div
        ref={function ref(this: ClassWithMetrics, node: HTMLDivElement) {
          this.boundLog("ref " + (node ? "node" : "null"));
        }.bind(this)}
        style={{ border: `2px solid ${this.color}` }}
      >
        <div>
          {this.componentId}*
          <span
            onClick={() => {
              resetConsole();
              this.forceUpdate();
            }}
            title="re-render"
          >
            🔄
          </span>
          <ErrorThrower />
          <Suspenser />
        </div>
        <div style={{ display: "grid", gridAutoFlow: "column" }}>
          <span />
          <ClassWithMetrics />
          <span />
        </div>
      </div>
    );
  }
}

function ExampleWithClass() {
  return (
    <ClassWithMetrics>
      <ErrorBoundary>
        <ClassWithMetrics>
          <ClassWithMetrics />
        </ClassWithMetrics>
      </ErrorBoundary>
      <ErrorBoundary>
        <ClassWithChildrenWithMetrics />
      </ErrorBoundary>
    </ClassWithMetrics>
  );
}

const useMetrics = () => {
  const color = React.useMemo(() => getRandomColor(), []);
  const componentId = React.useMemo(() => String.fromCharCode(i++), []);
  const withTiming = React.useContext(TimingContext);
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  const boundLog = React.useCallback(
    (message: string) => {
      log(`%cComponent ${componentId}: ${message}`, {
        ...withTiming,
        style: `color: ${color}`,
      });
    },
    [withTiming]
  );

  boundLog("render");
  const [s, forceUpdate] = React.useState({});

  React.useMemo(function useMemo() {
    boundLog("useMemo");
  }, []);

  React.useInsertionEffect(
    function useInsertionEffect() {
      boundLog("useInsertionEffect " + (elementRef.current ? "node" : "null"));
      return function useInsertionEffect_cleanup() {
        boundLog(
          "useInsertionEffect cleanup " + (elementRef.current ? "node" : "null")
        );
      };
    },
    [s]
  );

  React.useLayoutEffect(
    function useLayoutEffect() {
      boundLog("useLayoutEffect " + (elementRef.current ? "node" : "null"));
      return function useLayoutEffect_cleanup() {
        boundLog(
          "useLayoutEffect cleanup " + (elementRef.current ? "node" : "null")
        );
      };
    },
    [s]
  );

  React.useEffect(
    function useEffect() {
      boundLog("useEffect " + (elementRef.current ? "node" : "null"));
      return function useEffect_cleanup() {
        boundLog("useEffect cleanup " + (elementRef.current ? "node" : "null"));
      };
    },
    [s]
  );

  return {
    log: boundLog,
    color,
    componentId,
    forceUpdate,
    elementRef: elementRef,
  };
};

function FunctionWithMetrics({ children }: { children?: React.ReactNode }) {
  const { log, color, componentId, forceUpdate, elementRef } = useMetrics();

  return (
    <div
      ref={function ref(node) {
        elementRef.current = node;
        log("ref " + (node ? "node" : "null"));
      }}
      style={{ border: `2px solid ${color}` }}
    >
      <div>
        {componentId}
        <span
          onClick={() => {
            resetConsole();
            forceUpdate({});
          }}
          title="re-render"
        >
          🔄
        </span>
        <ErrorThrower />
        <Suspenser />
      </div>
      <div style={{ display: "grid", gridAutoFlow: "column" }}>{children}</div>
    </div>
  );
}

function FunctionWithChildrenWithMetrics(this: unknown) {
  const { log, color, componentId, forceUpdate, elementRef } = useMetrics();

  return (
    <div
      ref={function ref(node: HTMLDivElement | null) {
        elementRef.current = node;
        log("ref " + (node ? "node" : "null"));
      }.bind(this)}
      style={{ border: `2px solid ${color}` }}
    >
      <div>
        {componentId}*
        <span
          onClick={() => {
            resetConsole();
            forceUpdate({});
          }}
          title="re-render"
        >
          🔄
        </span>
        <ErrorThrower />
        <Suspenser />
      </div>
      <div style={{ display: "grid", gridAutoFlow: "column" }}>
        <span />
        <FunctionWithMetrics />
        <span />
      </div>
    </div>
  );
}

function ExampleWithFunction() {
  return (
    <FunctionWithMetrics>
      <ErrorBoundary>
        <FunctionWithMetrics>
          <FunctionWithMetrics />
        </FunctionWithMetrics>
      </ErrorBoundary>
      <ErrorBoundary>
        <FunctionWithChildrenWithMetrics />
      </ErrorBoundary>
    </FunctionWithMetrics>
  );
}

const examples = {
  class: ExampleWithClass,
  function: ExampleWithFunction,
};

function resetConsole() {
  console.clear();
  i = 65;
}

export function LifeCycleTimings() {
  const [example, setExample] = React.useState<null | keyof typeof examples>(
    null
  );
  const [, forceUpdate] = React.useState({});
  const Example: (() => JSX.Element) | undefined = examples[example!];

  const [withTimings, setTiming] = React.useState(false);
  const [withTasks, setTasks] = React.useState(false);
  const contextValue = React.useMemo(
    () => ({
      timings: withTimings,
      tasks: withTasks ? ("all" as const) : false,
    }),
    [withTimings, withTasks]
  );

  return (
    <>
      <div>
        Pick example:
        {Object.keys(examples).map((example) => (
          <button
            key={example}
            onClick={() => {
              if (examples[example as keyof typeof examples] === Example) {
                return;
              }
              resetConsole();
              setExample(example as keyof typeof examples);
            }}
          >
            {example}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "0.5em" }}>
        Timing {withTimings ? "enabled " : "disabled "}
        <button
          title={`Toggle timing to ${!withTimings ? "enabled " : "disabled "}`}
          onClick={() => {
            resetConsole();
            setTiming((t) => !t);
          }}
        >
          {withTimings ? "️⌛" : "⏳"}
        </button>
      </div>

      <div style={{ marginBottom: "0.5em" }}>
        Tasks {withTasks ? "enabled " : "disabled "}
        <button
          title={`Toggle tasks to ${!withTasks ? "enabled " : "disabled "}`}
          onClick={() => {
            resetConsole();
            setTasks((t) => !t);
          }}
        >
          {withTasks ? "️🪫" : "🔋"}
        </button>
      </div>

      {Example && (
        <>
          <div style={{ marginBottom: "0.5em" }}>
            <button
              onClick={() => {
                resetConsole();
                setExample(null);
              }}
            >
              Remove all
            </button>
            <button
              onClick={() => {
                resetConsole();
                forceUpdate({});
              }}
            >
              Re-render
            </button>
          </div>

          <div className="grow">
            <TimingContext.Provider value={contextValue}>
              <ErrorBoundary>
                <Example key={String(withTimings) + "-" + String(withTasks)} />
              </ErrorBoundary>
            </TimingContext.Provider>
          </div>

          <div style={{ marginTop: "0.5em" }}>
            <Legend />
          </div>
        </>
      )}
    </>
  );
}
