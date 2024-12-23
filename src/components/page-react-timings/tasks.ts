// === TASKS ===

declare global {
  interface Window {
    scheduler?: {
      postTask: (
        task: Function,
        opts: {
          priority: "user-blocking" | "user-visible" | "background";
        },
      ) => void;
    };
  }
}

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
  window.scheduler?.postTask(
    function userBlockingTaskCallback() {
      cb("task (user-blocking)");
    },
    { priority: "user-blocking" },
  );
}
export function userVisibleTask(cb: (type: string) => void) {
  window.scheduler?.postTask(
    function userVisibleTaskCallback() {
      cb("task (user-visible)");
    },
    { priority: "user-visible" },
  );
}
export function backgroundTask(cb: (type: string) => void) {
  window.scheduler?.postTask(
    function backgroundTaskCallback() {
      cb("task (background)");
    },
    { priority: "background" },
  );
}
export function task(cb: (type: string) => void) {
  const mc = new MessageChannel();
  mc.port1.postMessage(null);
  mc.port2.addEventListener(
    "message",
    function taskCallback() {
      cb("task");
    },
    { once: true },
  );
  mc.port2.start();
}
export function animationFrame(cb: (type: string) => void) {
  requestAnimationFrame(function animationTaskCallback() {
    cb("animation frame");
  });
}

export function startAllTasks(
  cb: (type: string) => void,
  includeVariationsOfTasks = false,
) {
  if (includeVariationsOfTasks) {
    backgroundTask(cb);
    userVisibleTask(cb);
    userBlockingTask(cb);
  }
  task(cb);
  animationFrame(cb);
  microTask(cb);
  syncTask(cb);
}

// === LOG ===

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
  {
    tasks,
    timings = false,
    style = "",
    nestedLogMessage,
  }: {
    tasks?: boolean | "all";
    timings?: boolean;
    style?: string;
    nestedLogMessage?: string | undefined;
  } = {},
) {
  if (!tasks) {
    console.log(getNow(timings) + label, style);
    return;
  }

  const timingStyle = [
    "font-style: italic; text-decoration-line: underline",
    "",
  ];

  const cb = (type: string) => {
    console.log(
      getNow(timings) + "%c" + type + "%c " + label,
      ...timingStyle,
      style,
    );
    if (nestedLogMessage) {
      log("< " + type + " " + nestedLogMessage, {
        tasks,
        timings,
        style,
      });
    }
  };
  startAllTasks(cb, tasks === "all");
}

// === FIND ===
export function find() {
  let isFinished = false;
  let time = document.timeline.currentTime!;
  const cancel = () => {
    isFinished = true;
  };
  const l = (message: string) => {
    if (isFinished) {
      return;
    }
    const now = document.timeline.currentTime!;
    if (now > time) {
      time = now;
      console.log(
        "  %cNew animation frame (frame " + now + ")",
        "color: green",
      );
    }
    console.log("  %c" + message, "color: orange");
  };

  l("sync");
  microTask(() => l("micro task"));
  task(() => l("task"));
  animationFrame(() => {
    l("animation frame");
    task(() => {
      l("animation frame > task");
      animationFrame(() => l("animation frame > task > animation frame"));
    });
  });

  return cancel;
}

// === VISUAL ===

export function triggerLayoutUpdate(node: HTMLElement) {
  if (node.style.marginTop) {
    node.style.marginTop = "";
  } else {
    node.style.marginTop = "10px";
  }
}
export function triggerPaintUpdate(node: HTMLElement) {
  if (node.style.backgroundColor) {
    node.style.backgroundColor = "";
  } else {
    node.style.backgroundColor = "red";
  }
}
export function triggerCompositionUpdate(node: HTMLElement) {
  if (node.style.opacity) {
    node.style.opacity = "";
  } else {
    node.style.opacity = "0.5";
  }
}
export function forceReflow(node: HTMLElement) {
  window.getComputedStyle(node);
}
