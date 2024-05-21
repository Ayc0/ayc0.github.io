import * as React from "react";
import { animationFrame, log, microTask, task } from "./tasks";

export function Render() {
  const [includeNested, setIncludeNested] = React.useState(false);
  const [withTimings, setWithTimings] = React.useState(false);
  const [allTasks, setAllTasks] = React.useState(false);
  return (
    <>
      <div>
        {includeNested ? "2 levels" : "Only 1 level"}
        <button onClick={() => setIncludeNested((n) => !n)}>
          {includeNested ? "⤴️" : "⤵️"}
        </button>
      </div>
      <div>
        Timing {withTimings ? "enabled " : "disabled "}
        <button
          onClick={() => {
            setWithTimings((t) => !t);
          }}
        >
          {withTimings ? "️⌛" : "⏳"}
        </button>
      </div>
      <div style={{ marginBottom: "0.5em" }}>
        {allTasks ? "All tasks" : "Some tasks"}
        <button onClick={() => setAllTasks((n) => !n)}>🔀</button>
      </div>
      <button
        onClick={() => {
          console.clear();
          log("from React onClick", {
            tasks: allTasks ? "all" : true,
            timings: withTimings,
            nestedLogMessage: includeNested
              ? "| from React onClick"
              : undefined,
          });
        }}
      >
        Trigger from a React onClick
      </button>
      <button
        ref={(node) => {
          if (!node) return;
          node.onclick = () => {
            console.clear();
            log("from HTML onClick", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested
                ? "| from HTML onClick"
                : undefined,
            });
          };
        }}
      >
        Trigger from a HTML onClick
      </button>
      <button
        onClick={() =>
          microTask(() => {
            console.clear();
            log("from micro task", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested ? "| from micro task" : undefined,
            });
          })
        }
      >
        Trigger from a micro task
      </button>
      <button
        onClick={() =>
          task(() => {
            console.clear();
            log("from task", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested ? "| from task" : undefined,
            });
          })
        }
      >
        Trigger from a task
      </button>
      <button
        onClick={() =>
          task(() => {
            console.clear();
            log("from user-blocking task", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested
                ? "| from user-blocking task"
                : undefined,
            });
          })
        }
      >
        Trigger from a user-blocking task
      </button>
      <button
        onClick={() =>
          animationFrame(() => {
            console.clear();
            log("from animation frame", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested
                ? "| from animation frame"
                : undefined,
            });
          })
        }
      >
        Trigger from a animation frame
      </button>
      <button
        onClick={() =>
          setTimeout(() => {
            console.clear();
            log("from setTimeout", {
              tasks: allTasks ? "all" : true,
              timings: withTimings,
              nestedLogMessage: includeNested ? "| from setTimeout" : undefined,
            });
          }, 50)
        }
      >
        Trigger from a setTimeout
      </button>
    </>
  );
}
