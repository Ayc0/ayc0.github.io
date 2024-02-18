import { orderCup } from "manatea";
import {
  lch,
  lab,
  rgb,
  hsl,
  type LabColor,
  type HCLColor,
  type RGBColor,
  type HSLColor,
  type ColorSpaceObject,
} from "d3-color";

export type Type = "lch" | "lab" | "rgb" | "hsl";
export interface Kind {
  lch: "l" | "c" | "h";
  lab: "l" | "a" | "b";
  rgb: "r" | "g" | "b";
  hsl: "h" | "s" | "l";
}
interface TriggerUpdate<T extends Type = Type, K extends Kind[T] = Kind[T]> {
  type: T;
  kind: K;
  value: number;
}

interface Stored {
  lch: {
    values: Record<Kind["lch"], number>;
    raw: HCLColor;
  };
  lab: {
    values: Record<Kind["lab"], number>;
    raw: LabColor;
  };
  rgb: {
    values: Record<Kind["rgb"], number>;
    raw: RGBColor;
  };
  hsl: {
    values: Record<Kind["hsl"], number>;
    raw: HSLColor;
  };
}

const bounds: { [type in Type]: Record<Kind[type], [number, number]> } = {
  lch: { l: [0, 100], c: [0, 132], h: [0, 360] },
  lab: { l: [0, 100], a: [-128, 127], b: [-128, 127] },
  rgb: { r: [0, 255], g: [0, 255], b: [0, 255] },
  hsl: { h: [0, 360], s: [0, 1], l: [0, 1] },
};

const initialLCHColor = lch(57, 110, 283.8);
const initialStored = createStored(initialLCHColor);

const computeUpdate = (
  update: TriggerUpdate,
  previouslyStored: Stored
): Stored => {
  switch (update.type) {
    case "lch": {
      const newColor = lch(previouslyStored.lch.raw);
      const kind = update.kind as Kind["lch"];
      newColor[kind] = clamp(update.value, ...bounds["lch"][kind]);
      if (areEqual(newColor, previouslyStored.lch.raw)) {
        return previouslyStored;
      }
      return createStored(newColor);
    }
    case "lab": {
      const newColor = lab(previouslyStored.lab.raw);
      const kind = update.kind as Kind["lab"];
      newColor[kind] = clamp(update.value, ...bounds["lab"][kind]);
      if (areEqual(newColor, previouslyStored.lab.raw)) {
        return previouslyStored;
      }
      return createStored(newColor);
    }
    case "rgb": {
      const newColor = rgb(previouslyStored.rgb.raw);
      const kind = update.kind as Kind["rgb"];
      newColor[kind] = clamp(update.value, ...bounds["rgb"][kind]);
      if (areEqual(newColor, previouslyStored.rgb.raw)) {
        return previouslyStored;
      }
      return createStored(newColor);
    }
    case "hsl": {
      const newColor = hsl(previouslyStored.hsl.raw);
      const kind = update.kind as Kind["hsl"];
      newColor[kind] = clamp(update.value, ...bounds["hsl"][kind]);
      if (areEqual(newColor, previouslyStored.hsl.raw)) {
        return previouslyStored;
      }
      return createStored(newColor);
    }
  }
};

export const colorController = orderCup<Stored, TriggerUpdate[]>(
  [],
  (updates, previouslyStored = initialStored) => {
    let valueToStore = previouslyStored;
    for (const update of updates) {
      valueToStore = computeUpdate(update, valueToStore);
    }
    return valueToStore;
  }
);

function clamp(number: number, min: number, max: number) {
  return Math.min(max, Math.max(min, number || 0));
}

function norm(color: ColorSpaceObject) {
  return JSON.stringify(
    Object.entries(color).sort(([a, b]) => a[0]!.localeCompare(b[0]))
  );
}
function areEqual(colorA: ColorSpaceObject, colorB: ColorSpaceObject) {
  return norm(colorA) === norm(colorB);
}

function createStored(color: ColorSpaceObject): Stored {
  const lchColor = lch(color);
  const labColor = lab(color);
  const rgbColor = rgb(color.formatHex());
  const hslColor = hsl(color.formatHex());
  return {
    lch: {
      values: {
        l: lchColor.l,
        c: lchColor.c,
        h: lchColor.h,
      },
      raw: lchColor,
    },
    lab: {
      values: {
        l: labColor.l,
        a: labColor.a,
        b: labColor.b,
      },
      raw: labColor,
    },
    rgb: {
      values: {
        r: rgbColor.r,
        g: rgbColor.g,
        b: rgbColor.b,
      },
      raw: rgbColor,
    },
    hsl: {
      values: {
        h: hslColor.h,
        s: hslColor.s,
        l: hslColor.l,
      },
      raw: hslColor,
    },
  };
}
