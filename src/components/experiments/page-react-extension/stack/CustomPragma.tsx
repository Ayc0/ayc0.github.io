/** @jsxRuntime classic */
/** @jsx h */

// TO: make it work with automatic and jsx & jsx-automatic etc.

import * as React from "react";

import { h } from "./_utils";

import { onClick } from "./on-click";

function FC() {
  return <button>Function</button>;
}

const MemoizedNamed = React.memo(function MemoizedInternal() {
  return <button>Memoized with an internal name</button>;
});
const MemoizedAnonymous = React.memo(() => {
  return <button>Memoized anonymous</button>;
});

const ForwardedRefNamed = React.forwardRef(function ForwardedRefInternal() {
  return <button>ForwardedRef with an internal name</button>;
});
const ForwardedRefAnonymous = React.forwardRef(() => {
  return <button>ForwardedRef anonymous</button>;
});

class Class extends React.Component<any> {
  override render() {
    console.log(
      "[CUSTOM] Test component render log in all browser dev tools",
      new Error().stack,
    );
    console.trace();
    // console.log("Class current fiber:", this._reactInternals);
    return <button>Class</button>;
  }
}

export const CustomPragma = () => {
  return (
    <fieldset
      style={{ display: "inline", border: "1px dashed blue" }}
      onClick={onClick}
    >
      <legend>Click Tracker</legend>

      {/* Render FC twice, to see how we work with same element twice */}
      <FC />
      <FC />

      <hr />

      <Class with={{ props: true }} />

      <hr />

      <MemoizedNamed />
      <MemoizedAnonymous />

      <hr />

      <ForwardedRefNamed />
      <ForwardedRefAnonymous />
    </fieldset>
  );
};
