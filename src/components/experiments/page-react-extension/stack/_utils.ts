import { getDisplayName } from "bippy";
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

// Doesn't work for debugging errors
// But works for the React devtools & for some minified logs:
// - CustomPragma ✅
// - Foo ❌ (says O.render, not Foo.render)
// - Bar ❌ (says "", not BarInternal nor Bar)
export function setName(obj: any, name: string) {
  // Disable for now, to see how RUM works here
  // Object.defineProperty(obj, "name", {
  //   writable: false,
  //   enumerable: false,
  //   configurable: true,
  //   value: name,
  // });
}

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
export const h: typeof React.createElement = (type, ...args) => {
  // Note: those don't work nicely:
  // - with class in Firefox: only display `render`, not `ComponentName.render`
  // - in Safari: only `h` appears, not the component render
  const debugStack = new Error("========");

  // When converting ReactElement to Fiber, only the type & the props are passed, so we can only play with those 2
  // See https://github.com/facebook/react/blob/da996a15be4f14aeb9726037f4559ff1cb3c2600/packages/react-reconciler/src/ReactFiber.js#L746-L756 or https://github.com/facebook/react/blob/da996a15be4f14aeb9726037f4559ff1cb3c2600/packages/react-reconciler/src/ReactFiber.js#L546

  if (typeof type === "function") {
    // We could want to bind to have a location per render, but realistically those don't change
    const cloned = type;

    // const cloned = type.bind();

    // const name = type.displayName || type.name;
    // setName(cloned, name);

    type = cloned;
    // console.log("[CUSTOM] function", debugStack.stack?.split("\n"));
  } else if (type && typeof type === "object" && "$$typeof" in type) {
    if (type.$$typeof === Symbol.for("react.memo")) {
      // MAPPED_TYPES.set(type.type, debugStack); // Set for fiber.type

      // For Object.memo, often we use them with anonymous functions, like React.memo(() => <div />)
      // But this generates "" for the name for the stack traces
      if (
        !type.type.name &&
        (getDisplayName(type.type) || getDisplayName(type))
      ) {
        setName(
          type.type,
          getDisplayName(type.type) || "memo(" + getDisplayName(type) + ")",
        );
      }
    } else {
      console.log("[CUSTOM] OTHER TYPE", type, {
        debugStack,
        owner: formatStack(debugStack),
      });
    }
  } else if (typeof type === "string") {
    // Do nothing
  } else {
    console.log("[CUSTOM] OTHER TYPE", type, {
      debugStack,
      owner: formatStack(debugStack),
    });
  }

  // if (type && typeof type === "object") {
  // TODO: handle `memo` & `forwardRef` (& `lazy`?)
  // }

  // Re-enable this comment to see the full pretty error when the React devtools are installed
  // console.error("HA");
  // console.log("[CUSTOM] stack", {
  //   raw: debugStack.stack.split("\n"),
  //   formatted: formatStack(debugStack),
  // });

  const element = React.createElement(type, ...args);
  // mapType.set(element, debugStack);

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
};

// @ts-expect-error
window._DEBUG_MAPPED_PROPS = MAPPED_PROPS;
