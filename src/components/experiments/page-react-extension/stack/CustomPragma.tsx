/** @jsxRuntime classic */
/** @jsx h */

// TO: make it work with automatic and jsx & jsx-automatic etc.

import * as React from "react";

import { h } from "./_utils";

const Paz = () => {
  return <div>Hello h</div>;
};

const Bar = React.memo(function BarInternal() {
  return <Paz />;
});

class Foo extends React.Component {
  override render() {
    console.log(
      "[CUSTOM] Test component render log in all browser dev tools",
      new Error().stack,
    );
    console.trace();
    // console.log("Class current fiber:", this._reactInternals);
    return (
      <div>
        <Bar />
        <Paz />
      </div>
    );
  }
}

export const CustomPragma = () => {
  return <Foo />;
};
