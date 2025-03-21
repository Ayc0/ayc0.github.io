import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import * as Diff from "diff";

const wrapper = document.getElementById("root")!;

const before = wrapper.innerHTML;
hydrateRoot(wrapper, <div>World</div>, {
  onRecoverableError: (error) => {
    console.warn("[CUSTOM] Recoverable error", error);
    const after = wrapper.innerHTML;

    console.log({
      before,
      after,
      diff: Diff.diffChars(before, after),
    });
  },
});
