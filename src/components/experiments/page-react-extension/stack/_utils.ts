import * as React from "react";

// Copied from https://github.com/facebook/react/blob/da996a15be4f14aeb9726037f4559ff1cb3c2600/packages/shared/DefaultPrepareStackTraceV8.js
// function DefaultPrepareStackTrace(
//   error: Error,
//   structuredStackTrace: any[],
// ): string {
//   const name = error.name || "Error";
//   const message = error.message || "";
//   let stack = name + ": " + message;
//   for (let i = 0; i < structuredStackTrace.length; i++) {
//     stack += "\n    at " + structuredStackTrace[i].toString();
//   }
//   return stack;
// }

// Inspired from https://github.com/facebook/react/blob/4a9df08157f001c01b078d259748512211233dcf/packages/shared/ReactOwnerStackFrames.js#L12 but swapped `react-stack-top-frame` with `========`
export function formatStack(error: Error): string {
  // const prevPrepareStackTrace = Error.prepareStackTrace;
  // Error.prepareStackTrace = DefaultPrepareStackTrace;
  let stack = error.stack!;
  // Error.prepareStackTrace = prevPrepareStackTrace;
  if (stack.startsWith("Error: ========\n")) {
    // V8's default formatting prefixes with the error message which we
    // don't want/need.
    stack = stack.slice("Error: ========\n".length);
  }
  let idx = stack.indexOf("\n");
  if (idx !== -1) {
    // Pop the h frame.
    // For Chrome & FF
    stack = stack.slice(idx + 1);
    // We could use `Error.captureStackTrace(debugStack, h)` in the h function, but it doesn't work in Firefox and older browsers
  }

  // Only keep 1 line:
  idx = stack.indexOf("\n");
  if (idx !== -1) {
    // Pop the h frame.
    // For Chrome & FF
    stack = stack.slice(0, idx + 1);
  }

  // react-stack-bottom-frame only exists in __DEV__, so can't be used for prod build
  idx = stack.indexOf("react-stack-bottom-frame");
  if (idx === 0) {
    return "";
  }
  if (idx !== -1) {
    idx = stack.lastIndexOf("\n", idx);
  }
  if (idx !== -1) {
    // Cut off everything after the bottom frame since it'll be internals.
    stack = stack.slice(0, idx);
  } else {
    // We didn't find any internal callsite out to user space.
    // This means that this was called outside an owner or the owner is fully internal.
    // To keep things light we exclude the entire trace in this case.
    // Difference from copied code: I commented this out to keep the full stack
    // return "";
  }
  return stack;
}

// Every JSX created is mapped to unique objects. So we can identify every render of every JSX with the props
// And even when we do `<div />` or `React.createElement('div')`, or `React.createElement('div', null)`, React uses `{}` in the end for the created props
// See https://github.com/facebook/react/blob/ef4bc8b4f91023afac437be9179beef350b32db3/packages/react/src/jsx/ReactJSXElement.js#L658-L659
// The only one I noticed that was `null` here was the root of the app, which we frankly don't care about
const MAPPED_PROPS = new WeakMap<any, Error>();
const conflictProps = new WeakSet<any>();

// @ts-expect-error
window._DEBUG_MAPPED_PROPS = MAPPED_PROPS;

export function h(type: any, ...args: any[]) {
  // Note: those don't work nicely:
  // - with class in Firefox: only display `render`, not `ComponentName.render`
  // - in Safari: only `h` appears, not the component render
  const debugStack = new Error("========");

  // Re-enable this comment to see the full pretty error when the React devtools are installed
  // console.error("HA");
  // console.log("[CUSTOM] stack", {
  //   raw: debugStack.stack?.split("\n"),
  //   formatted: formatStack(debugStack),
  // });

  // When converting ReactElement to Fiber, only the type & the props are passed, so we can only play with those 2
  // See https://github.com/facebook/react/blob/da996a15be4f14aeb9726037f4559ff1cb3c2600/packages/react-reconciler/src/ReactFiber.js#L746-L756 or https://github.com/facebook/react/blob/da996a15be4f14aeb9726037f4559ff1cb3c2600/packages/react-reconciler/src/ReactFiber.js#L546

  const element = React.createElement(type, ...args);

  if (element.props) {
    if (MAPPED_PROPS.has(element.props)) {
      console.warn(
        "[CUSTOM][PROPS] THIS SHOULD NOT EXIST: CONFLICT ON ",
        element.props,
        element,
      );
      MAPPED_PROPS.delete(element.props);
      conflictProps.add(element.props);
    }
    if (!conflictProps.has(element.props)) {
      MAPPED_PROPS.set(element.props, debugStack);
    }
  }

  return element;
}

// To make custom pragma work with TS
export namespace h {
  export namespace JSX {
    export interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}
