const div = document.createElement("div");
document.body.appendChild(div);

export function syncTask(cb: (type: string) => void) {
  (function syncCallback() {
    cb("sync");
  })();
}
export function microTask(cb: (type: string) => void) {
  queueMicrotask(function microTaskCallback() {
    cb("micro task");
  });
}
export function userBlockingTask(cb: (type: string) => void) {
  scheduler.postTask(
    function userBlockingTaskCallback() {
      cb("task (user-blocking)");
    },
    { priority: "user-blocking" }
  );
}
export function userVisibleTask(cb: (type: string) => void) {
  scheduler.postTask(
    function userVisibleTaskCallback() {
      cb("task (user-visible)");
    },
    { priority: "user-visible" }
  );
}
export function backgroundTask(cb: (type: string) => void) {
  scheduler.postTask(
    function backgroundTaskCallback() {
      cb("task (background)");
    },
    { priority: "background" }
  );
}
export function animationTask(cb: (type: string) => void) {
  requestAnimationFrame(function animationTaskCallback() {
    cb("animation frame");
  });
}

export function startAllTasks(cb: (type: string) => void) {
  syncTask(cb);
  microTask(cb);
  userBlockingTask(cb);
  userVisibleTask(cb);
  backgroundTask(cb);
  animationTask(cb);
}

function getNow(timings: boolean) {
  if (!timings) {
    return "";
  }

  return (
    "Now: " +
    performance.now().toFixed(1) +
    "ms | Timeline: " +
    document.timeline.currentTime +
    "ms | "
  );
}

export function log(
  label: string,
  color: string,
  {
    tasks,
    timings = false,
  }: {
    tasks?: boolean;
    timings?: boolean;
  } = {}
) {
  if (!tasks) {
    console.log(getNow(timings) + label, color);
    return;
  }

  const timingStyle = [
    "font-style: italic; text-decoration-line: underline",
    "",
  ];

  const cb = (type: string) =>
    console.log(
      getNow(timings) + "%c" + type + "%c " + label,
      ...timingStyle,
      color
    );

  startAllTasks(cb);
}
