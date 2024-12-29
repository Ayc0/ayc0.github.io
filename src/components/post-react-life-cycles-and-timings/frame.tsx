import * as React from "react";

import classes from "./frame.module.css";

export const createFrame = () => {
  const console = { log: (..._messages: string[]) => {}, clear: () => {} };

  const Logs = () => {
    const [logs, setLogs] = React.useState<React.ReactNode[]>([]);

    console.log = (...messages: string[]) => {
      React.startTransition(() =>
        setLogs((logs) => [...logs, messages.join(" ")]),
      );
    };

    console.clear = () => {
      React.startTransition(() =>
        setLogs([
          <span className={classes["clear-console"]}>Console was cleared</span>,
        ]),
      );
    };

    return (
      <pre className={classes.console}>
        <code>
          {logs.map((log, index) => (
            <>
              {index !== 0 ? <hr className={classes["log-separator"]} /> : null}
              <div className={classes.log}>{log}</div>
            </>
          ))}
        </code>
      </pre>
    );
  };

  const Frame = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className={classes.frame}>
        <div className={`not-content ${classes.window}`}>{children}</div>

        <Logs />
      </div>
    );
  };

  const useConsole = () => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const getRef = () => (ref.current ? "node" : "null");

    return {
      console: {
        clear: () => console.clear(),
        log: (...messages: string[]) => console.log(...messages, getRef()),
      },
      setNode: (node: HTMLDivElement | null) => {
        ref.current = node;
      },
    };
  };

  return {
    console,
    useConsole,
    Frame,
  };
};
