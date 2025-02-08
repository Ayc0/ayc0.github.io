import * as React from "react";
import { getFiberStack, getDisplayName, type Fiber } from "bippy";
import { getFiberData, getFiberFromElement } from "./fiber";

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ReactNode }>,
  { hasError: boolean }
> {
  constructor(props: React.PropsWithChildren<{ fallback?: React.ReactNode }>) {
    super(props);
    this.state = { hasError: false };
  }

  static displayName = "ErrorBoundary";

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    // console.log("componentDidCatch", { error, info, this: this });
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

const ErrorThrowerOnClick = () => {
  return (
    <button
      onClick={() => {
        throw new Error("Hello");
      }}
    >
      Trigger 💥 crash (in onClick)
    </button>
  );
};
ErrorThrowerOnClick.displayName = "ErrorThrowerOnClick";

function ErrorThrowerOnRender() {
  const [aaaa, setAaaa] = React.useState(false);
  if (aaaa) {
    throw new Error("Hello");
  }
  return (
    <button
      onClick={() => {
        setAaaa(true);
      }}
    >
      Trigger 💥 crash (on render)
    </button>
  );
}
ErrorThrowerOnRender.displayName = "ErrorThrowerOnRender";

const ErrorThrowerOnEffect = () => {
  const [aaaa, setAaaa] = React.useState(false);

  React.useEffect(() => {
    if (aaaa) {
      throw new Error("Hello");
    }
  }, [aaaa]);

  return (
    <button
      onClick={() => {
        setAaaa(true);
      }}
    >
      Trigger 💥 crash (on effect)
    </button>
  );
};
ErrorThrowerOnEffect.displayName = "ErrorThrowerOnEffect";

const ClickTracker = ({ children }: { children?: React.ReactNode }) => {
  return (
    <fieldset
      style={{ display: "inline", border: "1px dashed blue" }}
      onClick={(event) => {
        const fiber = getFiberFromElement(event.target);
        if (!fiber) {
          return;
        }
        const fiberData = getFiberData(fiber);
        console.log("Clicked on", {
          element: event.target,
          fiber: fiber,
          ...fiberData,
        });
      }}
    >
      <legend>Click Tracker</legend>
      {children}
    </fieldset>
  );
};
ClickTracker.displayName = "ClickTracker";

const Bar = () => {
  return (
    <ClickTracker>
      <ErrorThrowerOnClick />

      <ErrorThrowerOnRender />

      <ErrorBoundary>
        <fieldset style={{ display: "inline", border: "1px solid red" }}>
          <legend>Error Boundary</legend>
          <ErrorThrowerOnRender />
          <ErrorThrowerOnEffect />
        </fieldset>
      </ErrorBoundary>
    </ClickTracker>
  );
};
Bar.displayName = "Bar";

const Foo = () => {
  return <Bar />;
};
Foo.displayName = "Foo";

export const App = () => {
  return (
    <>
      <div>Hello World</div>
      <Foo />
    </>
  );
};
App.displayName = "App";
