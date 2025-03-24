import * as React from "react";

import { setName, h } from "./_utils";

const Paz = () => {
  return h("div", undefined, "Hello h");
};
setName(Paz, "Paz");

const Bar = React.memo(function BarInternal() {
  return h(Paz);
});
setName(Bar, "Bar");

class Foo extends React.Component {
  override render() {
    console.log(
      "[CUSTOM] Test component render log in all browser dev tools",
      new Error().stack,
    );
    console.trace();
    // console.log("Class current fiber:", this._reactInternals);
    return h(Bar);
  }
}
setName(Foo, "Foo");

export const CustomPragma = () => {
  return h(Foo);
};
setName(CustomPragma, "CustomPragma");
