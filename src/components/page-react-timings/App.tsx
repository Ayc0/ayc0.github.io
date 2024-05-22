import * as React from "react";

import { LifeCycleTimings } from "./LifeCycleTimings";
import { Render } from "./Render";
import { Event } from "./Event";
import { Rerender } from "./Rerender";

export function App() {
  return (
    <>
      <h2>Test how component (re-)renders</h2>
      <LifeCycleTimings />
      <hr />
      <h2>Test tasks ordering</h2>
      <Render />
      <hr />
      <h2>Test event capture / event bubble</h2>
      <Event />
      <hr />
      <h2>Test re-renders</h2>
      <Rerender />
    </>
  );
}
