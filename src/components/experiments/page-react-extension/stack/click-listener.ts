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
      // @ts-expect-error
      const foundStackViaType = window._DEBUG_MAPPED_TYPES.get(
        current.elementType,
      );

      // @ts-expect-error
      const foundStackViaProps = window._DEBUG_MAPPED_PROPS.get(
        current.pendingProps,
      );

      if (
        foundStackViaProps &&
        foundStackViaType &&
        foundStackViaProps !== foundStackViaType
      ) {
        console.error("[CUSTOM] CONFLICT", {
          current,
          foundStackViaType,
          foundStackViaProps,
        });
      }
      const foundStack = foundStackViaProps || foundStackViaType;

      if (foundStack) {
        formattedErrorStack.push(formatStack(foundStack));
      } else {
        console.warn(
          "[CUSTOM] No stack for",
          current.elementType?.name,
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
