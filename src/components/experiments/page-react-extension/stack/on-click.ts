import { getFiberFromElement, getFiberName } from "../fiber";
import { getStackFromFiber } from "./_utils";

export const onClick = (event: React.MouseEvent) => {
  const target = event.target as EventTarget;
  const fiber = getFiberFromElement(target);
  if (!fiber) {
    return;
  }

  const error = getStackFromFiber(
    fiber,
    `[CUSTOM] Clicked on ${getFiberName(fiber)}`,
  );

  console.log(error.stack);

  window.DD_RUM?.addError(error);
};
