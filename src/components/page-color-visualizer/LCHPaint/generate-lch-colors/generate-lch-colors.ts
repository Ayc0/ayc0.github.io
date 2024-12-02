import Color from "colorjs.io";

import { task } from "../../worker-utils";

interface Step {
  coordinates: { x: number; y: number };
  colors: [r: number, g: number, b: number];
}

export async function* generateColors(
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
): AsyncGenerator<Step> {
  const color = new Color("lch", [50, 50, hue]);
  for (let x = 0; x < width; x += 1) {
    // Add some timeouts to allow injecting a break within the loop, for new events
    if (x !== 0) {
      await new Promise<void>((resolve) => task(resolve));
    }
    for (let y = 0; y < height; y += 1) {
      color.c = Math.floor((x / width) * 150); // chroma goes to 150
      color.l = Math.floor((1 - y / height) * 100);
      yield {
        coordinates: { x, y },
        colors: color.to(colorSpace === "srgb" ? "srgb" : "p3").coords,
      };
    }
  }
}
