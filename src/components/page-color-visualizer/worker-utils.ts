export function task(cb: () => void) {
  const mc = new MessageChannel();
  mc.port1.postMessage(null);
  mc.port2.addEventListener(
    "message",
    function taskCallback() {
      cb();
    },
    { once: true }
  );
  mc.port2.start();
}

export function createScheduler() {
  let lastStarted = {};
  const toRunNoMatterWhat = new Set<{}>();
  let lastUnstoppableStart = -Infinity;
  return {
    start: (key: {}): void => {
      const now = performance.now();
      lastStarted = key;

      // Force run every 0.5s
      if (now - lastUnstoppableStart > 500) {
        lastUnstoppableStart = now;
        toRunNoMatterWhat.add(key);
      }
    },
    shouldRun: (key: {}): boolean => {
      if (toRunNoMatterWhat.has(key)) {
        return true;
      }
      return key === lastStarted;
    },
  };
}
