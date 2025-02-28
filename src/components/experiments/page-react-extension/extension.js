const renderers = new Map();
let uidCounter = 0;

window.customDevTools = false;
if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  customDevTools = true;
  console.log(
    "%c[CUSTOM] Injecting custom React DevTools hook!",
    "color:orangered",
  );
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    // rendererInterfaces: new Map(),
    // listeners: {},

    // backends: new Map(),

    // Fast Refresh for web relies on this.
    renderers,
    // hasUnsupportedRendererAttached: false,

    // emit: () => {},
    // getFiberRoots: () => {},
    inject: (renderer) => {
      const id = ++uidCounter;
      // console.log("inject", renderer);
      renderers.set(id, renderer);
    },
    // on: () => {},
    // off: () => {},
    // sub: () => {},

    // This is a legacy flag.
    // React v16 checks the hook for this to ensure DevTools is new enough.
    supportsFiber: true,

    // React Flight Client checks the hook for this to ensure DevTools is new enough.
    supportsFlight: true,

    // React calls these methods.
    // checkDCE: () => {},
    // onCommitFiberUnmount: () => {},
    // onCommitFiberRoot: () => {},
    // // React v18.0+
    // onPostCommitFiberRoot: () => {},
    // setStrictMode: () => {},

    // // Schedule Profiler runtime helpers.
    // // These internal React modules to report their own boundaries
    // // which in turn enables the profiler to dim or filter internal frames.
    // getInternalModuleRanges: () => {},
    // registerInternalModuleStart: () => {},
    // registerInternalModuleStop: () => {},
  };
}

const initialOnCommitFiberRoot =
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot;

let logged = false;
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = (...args) => {
  try {
    initialOnCommitFiberRoot(...args);
  } catch (e) {}

  if (logged) {
    return;
  }

  logged = true;

  // console.log("onCommitFiberRoot", args);
  // See https://unpkg.com/browse/react-dom@18.3.1/umd/react-dom.development.js#L12003
  console.log(
    "Root mode:",
    args[1].tag === 1 ? "ConcurrentRoot" : "LegacyRoot",
  );
};
