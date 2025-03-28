import type { Fiber } from "bippy";
import { getFiberFromElement, getFiberName } from "../fiber";
import { formatStack } from "./_utils";

export const startClickListening = () => {
  document.addEventListener("click", (event) => {
    const target = event.target as EventTarget;
    const fiber = getFiberFromElement(target);
    if (!fiber) {
      return;
    }
    const formattedErrorStack = [];
    let current: Fiber | null = fiber;
    while (current) {
      console.log("current.pendingProps", current.pendingProps);
      if (!current.pendingProps) {
        console.log(current);
      }
      // @ts-expect-error
      const foundStackViaProps = window._DEBUG_MAPPED_PROPS.get(
        current.pendingProps,
      );

      if (foundStackViaProps) {
        formattedErrorStack.push(formatStack(foundStackViaProps));
      } else {
        console.warn(
          `[CUSTOM] No stack for "${current.elementType?.name}"`,
          current,
        );
      }
      if (current.return === current) {
        // console.log("INF");
        break;
      }
      current = current.return;
    }
    console.log(
      "[CUSTOM] Clicked on " +
        [getFiberName(fiber), "\n", ...formattedErrorStack].join(""),
    );
  });
};
