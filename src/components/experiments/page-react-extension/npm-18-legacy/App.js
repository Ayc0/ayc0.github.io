import * as React from "react-18";
// import { getFiberStack, getDisplayName, type Fiber } from "bippy";
import { getFiberData, getFiberFromElement } from "./fiber";

// Can't use JSX as it will collide with Astro rendering

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static displayName = "ErrorBoundary";

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  //   componentDidCatch(error: Error, info: React.ErrorInfo) {
  //     // console.log("componentDidCatch", { error, info, this: this });
  //   }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

const ErrorThrowerOnClick = () => {
  return React.createElement(
    "button",
    {
      onClick: () => {
        throw new Error("Hello");
      },
    },
    "Trigger \uD83D\uDCA5 crash (in onClick)",
  );
};
ErrorThrowerOnClick.displayName = "ErrorThrowerOnClick";

function ErrorThrowerOnRender() {
  const [aaaa, setAaaa] = React.useState(false);
  if (aaaa) {
    throw new Error("Hello");
  }

  return React.createElement(
    "button",
    {
      onClick: () => {
        setAaaa(true);
      },
    },
    "Trigger \uD83D\uDCA5 crash (on render)",
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

  return React.createElement(
    "button",
    {
      onClick: () => {
        setAaaa(true);
      },
    },
    "Trigger \uD83D\uDCA5 crash (on effect)",
  );
};
ErrorThrowerOnEffect.displayName = "ErrorThrowerOnEffect";

const ClickTracker = ({ children }) => {
  return React.createElement(
    "fieldset",
    {
      style: { display: "inline", border: "1px dashed blue" },
      onClick: (event) => {
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
      },
    },
    children,
  );
};
ClickTracker.displayName = "ClickTracker";

const Bar = () => {
  return React.createElement(
    ClickTracker,
    null,
    React.createElement(ErrorThrowerOnClick),
    React.createElement(ErrorThrowerOnRender),
    React.createElement(
      ErrorBoundary,
      null,
      React.createElement(
        "fieldset",
        { style: { display: "inline", border: "1px solid red" } },
        React.createElement("legend", null, "Error Boundary"),
        React.createElement(ErrorThrowerOnRender),
        React.createElement(ErrorThrowerOnEffect),
      ),
    ),
  );
};
Bar.displayName = "Bar";

const Foo = () => {
  return React.createElement(Bar);
};
Foo.displayName = "Foo";

export const App = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("div", null, "Hello World"),
    React.createElement(Foo),
  );
};
App.displayName = "App";
