/** @jsxRuntime classic */
/** @jsx h */

// TO: make it work with automatic and jsx & jsx-automatic etc.

import * as React from "react";

import { getStackFromFiber, h } from "./_utils";

import { onClick } from "./on-click";

function FC() {
  return <button>Function</button>;
}

const MemoizedNamed = React.memo(function MemoizedInternal() {
  return <button>Memoized with an internal name</button>;
});
const MemoizedAnonymous = React.memo(() => {
  return <button>Memoized anonymous</button>;
});

const ForwardedRefNamed = React.forwardRef(function ForwardedRefInternal() {
  return <button>ForwardedRef with an internal name</button>;
});
const ForwardedRefAnonymous = React.forwardRef(() => {
  return <button>ForwardedRef anonymous</button>;
});

class Class extends React.Component<any> {
  override render() {
    console.log(
      "[CUSTOM] Test component render log in all browser dev tools",
      new Error().stack,
    );
    console.trace();
    // console.log("Class current fiber:", this._reactInternals);
    return <button>Class</button>;
  }
}

const TrackingContext = React.createContext<Error | undefined>(undefined);

const useTrackingError = () => {
  const wrappingTrackingError = React.useContext(TrackingContext);

  const trackingError = new Error(undefined, {
    cause: wrappingTrackingError,
  });

  // `captureStackTrace` is not available in Firefox / older browsers
  if ("captureStackTrace" in Error) {
    // Avoid reporting `useErrorContext` in the stack trace to have the real source of the error
    Error.captureStackTrace(trackingError, useTrackingError);
  }

  function mergeErrorWithTracking(error: Error) {
    const trackedError = new Error(error.message, {
      cause: trackingError,
    });

    // `captureStackTrace` is not available in Firefox / older browsers
    if ("captureStackTrace" in Error) {
      // Avoid reporting `useErrorContext` in the stack trace to have the real source of the error
      Error.captureStackTrace(trackedError, mergeErrorWithTracking);
    }

    return trackedError;
  }

  return mergeErrorWithTracking;
};

function useC() {
  const mergeErrorWithTracking = useTrackingError();

  React.useEffect(() => {
    setTimeout(() => {
      fetch("https://ayc0.github.io/unknown")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Fetch error: ${res.status}`);
          }
        })
        .catch((error) => {
          console.error(mergeErrorWithTracking(error));
          // window.DD_RUM?.addError(mergeErrorWithTracking(error));
        });
    }, 100);
  }, []);
}

function useB() {
  useC();
}

function useA() {
  useB();
}

function TrackHook() {
  useA();
  return <div>Hook</div>;
}

const withTracking = <P,>(Component: React.ComponentType<P>) => {
  class WrappedComponent extends React.Component<P> {
    override render() {
      // @ts-expect-error
      const thisFiber = getStackFromFiber(this._reactInternals);

      return (
        <TrackingContext.Provider value={thisFiber}>
          <Component {...this.props} />
        </TrackingContext.Provider>
      );
    }
  }

  return WrappedComponent;
};

const TrackHookSurroundedByContext = withTracking(TrackHook);

export const CustomPragma = () => {
  return (
    <fieldset
      style={{ display: "inline", border: "1px dashed blue" }}
      onClick={onClick}
    >
      <legend>Click Tracker</legend>

      {/* Render FC twice, to see how we work with same element twice */}
      <FC />
      <FC />

      <hr />

      <Class with={{ props: true }} />

      <hr />

      <MemoizedNamed />
      <MemoizedAnonymous />

      <hr />

      <ForwardedRefNamed />
      <ForwardedRefAnonymous />

      <hr />

      <TrackHook />
      <TrackHookSurroundedByContext />
    </fieldset>
  );
};
