import Color from "colorjs.io";
import type { Step } from "@components/page-color-visualizer/worker-utils";

export function* generateColors(
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
): Generator<Step> {
  const color = new Color("lch", [50, 50, hue]);
  for (let x = 0; x < width; x += 1) {
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
