if (window.React) {
  console.log("global React", React.version);
}

if (window.ReactDOM) {
  console.log("global ReactDOM", ReactDOM.version);
}

if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  console.log(
    window.customDevTools ? "From custom DevTools" : "From DevTools",
    [...window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.values()].map(
      (renderer) => ({
        reactVersion: renderer.reconcilerVersion,
        rendererPackageName: renderer.rendererPackageName,
        rendererVersion: renderer.version,
      }),
    ),
  );
  if (window.customDevTools) {
    delete window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  }
}
