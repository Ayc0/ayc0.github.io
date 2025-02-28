if (window.React) {
  console.log("[CUSTOM] global React", React.version);
}

if (window.ReactDOM) {
  console.log("[CUSTOM] global ReactDOM", ReactDOM.version);
}

if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  setTimeout(() => {
    console.log(
      window.customDevTools
        ? "[CUSTOM] From custom DevTools"
        : "[CUSTOM] From DevTools",
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
  }, 100); // The renderers aren't injected in a blocking way but asynchronously
}
