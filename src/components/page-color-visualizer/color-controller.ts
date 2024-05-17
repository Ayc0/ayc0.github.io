import { orderCup } from "manatea";
import Color from "colorjs.io";

export type Type = "lch" | "lab" | "srgb" | "hsl";
export interface Kind {
  lch: "l" | "c" | "h";
  lab: "l" | "a" | "b";
  srgb: "r" | "g" | "b";
  hsl: "h" | "s" | "l";
}
interface TriggerUpdate<T extends Type = Type, K extends Kind[T] = Kind[T]> {
  type: T;
  kind: K;
  value: number;
}

const initialLCHColor = new Color("srgb", [0.2, 0.45, 0.98]);

const computeUpdate = (
  update: TriggerUpdate,
  previouslyStored: Color
): Color => {
  const newColor = new Color(previouslyStored).to(update.type);
  newColor[update.kind] = update.value;
  return newColor;
};

export const colorController = orderCup<Color, TriggerUpdate[]>(
  [],
  (updates, previouslyStored = initialLCHColor) => {
    let valueToStore = previouslyStored;
    for (const update of updates) {
      valueToStore = computeUpdate(update, valueToStore);
    }
    return valueToStore;
  }
);
