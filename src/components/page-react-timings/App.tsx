import React from "react";
import { log } from "./tasks";

const getRandomColor = () => {
  return `lch(${Math.floor(Math.random() * 20) + 50}% ${
    Math.floor(Math.random() * 50) + 50
  } ${Math.floor(Math.random() * 360)})`;
};

let i = 65;

declare global {
  const scheduler: {
    postTask: (
      task: Function,
      opts: {
        priority: "user-blocking" | "user-visible" | "background";
      }
    ) => void;
  };
}

const TimingContext = React.createContext({
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
      return <div style={{ border: `2px dashed red` }}>Oops</div>;
    }

    return (
      <React.Suspense
        fallback={
          <div style={{ border: `4px dotted blue`, padding: "4px" }}>⏸️</div>
        }
      >
        <div style={{ border: `4px dotted red`, padding: "4px" }}>
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

class ClassWithMetrics extends React.Component<{
  children?: React.ReactNode;
  dashed?: boolean;
}> {
  static override contextType = TimingContext;
  declare context: React.ContextType<typeof TimingContext>;

  color = getRandomColor();
  componentId = String.fromCharCode(i++);

  boundLog(message: string) {
    log(
      `%cComponent ${this.componentId}: ${message}`,
      `color: ${this.color}`,
      this.context
    );
  }

  constructor(props: { children?: React.ReactNode; dashed?: boolean }) {
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
          border: `2px ${this.props.dashed ? "dashed" : "solid"} ${this.color}`,
        }}
      >
        <div>
          {this.componentId}
          <span onClick={() => this.forceUpdate()} title="re-render">
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
          <span onClick={() => this.forceUpdate()} title="re-render">
            🔄
          </span>
          <ErrorThrower />
          <Suspenser />
        </div>
        <div style={{ display: "grid", gridAutoFlow: "column" }}>
          <span />
          <ClassWithMetrics dashed />
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

  const boundLog = React.useCallback(
    (message: string) => {
      log(
        `%cComponent ${componentId}: ${message}`,
        `color: ${color}`,
        withTiming
      );
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
      boundLog("useInsertionEffect");
      return function useInsertionEffect_cleanup() {
        boundLog("useInsertionEffect cleanup");
      };
    },
    [s]
  );

  React.useLayoutEffect(
    function useLayoutEffect() {
      boundLog("useLayoutEffect");
      return function useLayoutEffect_cleanup() {
        boundLog("useLayoutEffect cleanup");
      };
    },
    [s]
  );

  React.useEffect(
    function useEffect() {
      boundLog("useEffect");
      return function useEffect_cleanup() {
        boundLog("useEffect cleanup");
      };
    },
    [s]
  );

  return { log: boundLog, color, componentId, forceUpdate };
};

function FunctionWithMetrics({
  children,
  dashed,
}: {
  children?: React.ReactNode;
  dashed?: boolean;
}) {
  const { log, color, componentId, forceUpdate } = useMetrics();

  return (
    <div
      ref={function ref(node) {
        log("ref " + (node ? "node" : "null"));
      }}
      style={{ border: `2px ${dashed ? "dashed" : "solid"} ${color}` }}
    >
      <div>
        {componentId}
        <span onClick={() => forceUpdate({})} title="re-render">
          🔄
        </span>
        <ErrorThrower />
        <Suspenser />
      </div>
      <div style={{ display: "grid", gridAutoFlow: "column" }}>{children}</div>
    </div>
  );
}

function FunctionWithChildrenWithMetrics(
  this: unknown,
  {
    children,
  }: {
    children?: React.ReactNode;
  }
) {
  const { log, color, componentId, forceUpdate } = useMetrics();

  return (
    <div
      ref={function ref(node: HTMLDivElement | null) {
        log("ref " + (node ? "node" : "null"));
      }.bind(this)}
      style={{ border: `2px solid ${color}` }}
    >
      <div>
        {componentId}*
        <span onClick={() => forceUpdate({})} title="re-render">
          🔄
        </span>
        <ErrorThrower />
        <Suspenser />
      </div>
      <div style={{ display: "grid", gridAutoFlow: "column" }}>
        <span />
        <FunctionWithMetrics dashed />
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

export default function App() {
  const [example, setExample] = React.useState<null | keyof typeof examples>(
    null
  );
  const Example: (() => JSX.Element) | undefined = examples[example!];

  const [withTimings, setTiming] = React.useState(false);
  const [withTasks, setTasks] = React.useState(false);
  const contextValue = React.useMemo(
    () => ({ timings: withTimings, tasks: withTasks }),
    [withTimings, withTasks]
  );

  return (
    <div className="App">
      <div>
        Timing {withTimings ? "enabled " : "disabled "}
        <button
          title={`Toggle timing to ${!withTimings ? "enabled " : "disabled "}`}
          onClick={() => {
            console.clear();
            i = 65;
            setTiming((t) => !t);
          }}
        >
          {withTimings ? "️⌛" : "⏳"}
        </button>
      </div>
      <div>
        Tasks {withTasks ? "enabled " : "disabled "}
        <button
          title={`Toggle tasks to ${!withTasks ? "enabled " : "disabled "}`}
          onClick={() => {
            console.clear();
            i = 65;
            setTasks((t) => !t);
          }}
        >
          {withTasks ? "️🪫" : "🔋"}
        </button>
      </div>
      <div>
        Pick example:
        <button
          onClick={() => {
            console.clear();
            i = 65;
            setExample(null);
          }}
        >
          Remove all
        </button>
        {Object.keys(examples).map((example) => (
          <button
            key={example}
            onClick={() => {
              console.clear();
              i = 65;
              setExample(example as keyof typeof examples);
            }}
          >
            {example}
          </button>
        ))}
      </div>
      <TimingContext.Provider value={contextValue}>
        <ErrorBoundary>
          {Example && (
            <Example key={String(withTimings) + "-" + String(withTasks)} />
          )}
        </ErrorBoundary>
      </TimingContext.Provider>
    </div>
  );
}
