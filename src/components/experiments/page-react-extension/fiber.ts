import { getFiberStack, getDisplayName, type Fiber } from "bippy";

function getName(fiber: Fiber | null) {
  if (!fiber) {
    return null;
  }
  if (typeof fiber.type === "string") {
    return fiber.type;
  }
  return getDisplayName(fiber);
}

export function getFiberFromElement(element: EventTarget) {
  const keys = Object.keys(element);
  const reactFiberKey = keys.find((key) => key.startsWith("__reactFiber$"));
  if (!reactFiberKey) {
    return undefined;
  }
  // @ts-expect-error
  const fiber = element[reactFiberKey] as Fiber;
  return fiber;
}

export function getRoot(fiber: Fiber) {
  let current = fiber;
  while (current.return) {
    current = current.return;
  }
  return current.stateNode;
}

export function getFiberData(fiber: Fiber | null) {
  return {
    fiberName: getName(fiber),
    fiberStack: fiber
      ? getFiberStack(fiber).map(getName).filter(Boolean).reverse().join(" > ")
      : null,
  };
}
