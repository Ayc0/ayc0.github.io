import React from "react";

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

const TimingContext = React.createContext(false);

function measureTiming(label: string, color: string, withTiming: boolean) {
  if (withTiming) {
    console.log(performance.now().toFixed(1) + "ms " + label, color);
    queueMicrotask(function measureTiming_microTask() {
      console.log(
        performance.now().toFixed(1) + "ms microtask " + label,
        color
      );
    });
    requestAnimationFrame(function measureTiming_requestAnimationFrame() {
      console.log(
        performance.now().toFixed(1) + "ms requestAnimationFrame " + label,
        color
      );
    });
    scheduler.postTask(
      function measureTiming_userBlockingTask() {
        console.log(
          performance.now().toFixed(1) + "ms user-blocking task " + label,
          color
        );
      },
      {
        priority: "user-blocking",
      }
    );
    scheduler.postTask(
      function measureTiming_userVisibleTask() {
        console.log(
          performance.now().toFixed(1) + "ms user-visible task " + label,
          color
        );
      },
      {
        priority: "user-visible",
      }
    );
    scheduler.postTask(
      function measureTiming_backgroundTask() {
        console.log(
          performance.now().toFixed(1) + "ms background task " + label,
          color
        );
      },
      {
        priority: "background",
      }
    );
  } else {
    console.log(label, color);
  }
}

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

  log(message: string) {
    measureTiming(
      `%cComponent ${this.componentId}: ${message}`,
      `color: ${this.color}`,
      this.context
    );
  }

  constructor(props: { children?: React.ReactNode; dashed?: boolean }) {
    super(props);

    this.log("constructor");
  }

  override componentWillMount() {
    this.log("componentWillMount");
  }

  override componentWillReceiveProps() {
    this.log("componentWillReceiveProps");
  }

  override componentWillUpdate() {
    this.log("componentWillUpdate");
  }

  override componentDidMount() {
    this.log("componentDidMount");
  }

  override componentDidUpdate() {
    this.log("componentDidUpdate");
  }

  override shouldComponentUpdate() {
    this.log("shouldComponentUpdate");
    return true;
  }

  override getSnapshotBeforeUpdate() {
    this.log("getSnapshotBeforeUpdate");
  }

  override componentWillUnmount() {
    this.log("componentWillUnmount");
  }

  override render() {
    this.log("render");
    return (
      <div
        ref={function ref(this: ClassWithMetrics, node: HTMLDivElement) {
          this.log("ref " + (node ? "node" : "null"));
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
    this.log("render");
    return (
      <div
        ref={function ref(this: ClassWithMetrics, node: HTMLDivElement) {
          this.log("ref " + (node ? "node" : "null"));
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

  const log = React.useCallback(
    (message: string) => {
      measureTiming(
        `%cComponent ${componentId}: ${message}`,
        `color: ${color}`,
        withTiming
      );
    },
    [withTiming]
  );

  log("render");
  const [s, forceUpdate] = React.useState({});

  React.useMemo(function useMemo() {
    log("useMemo");
  }, []);

  React.useInsertionEffect(
    function useInsertionEffect() {
      log("useInsertionEffect");
      return function useInsertionEffect_cleanup() {
        log("useInsertionEffect cleanup");
      };
    },
    [s]
  );

  React.useLayoutEffect(
    function useLayoutEffect() {
      log("useLayoutEffect");
      return function useLayoutEffect_cleanup() {
        log("useLayoutEffect cleanup");
      };
    },
    [s]
  );

  React.useEffect(
    function useEffect() {
      log("useEffect");
      return function useEffect_cleanup() {
        log("useEffect cleanup");
      };
    },
    [s]
  );

  return { log, color, componentId, forceUpdate };
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

  const [withTiming, setTiming] = React.useState(false);

  return (
    <div className="App">
      <div>
        Timing {withTiming ? "enabled " : "disabled "}
        <button
          title={`Toggle timing to ${!withTiming ? "enabled " : "disabled "}`}
          onClick={() => {
            console.clear();
            i = 65;
            setTiming(!withTiming);
          }}
        >
          {withTiming ? "️⌛" : "⏳"}
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
      <TimingContext.Provider value={withTiming}>
        <ErrorBoundary>
          {Example && <Example key={String(withTiming)} />}
        </ErrorBoundary>
      </TimingContext.Provider>
    </div>
  );
}
