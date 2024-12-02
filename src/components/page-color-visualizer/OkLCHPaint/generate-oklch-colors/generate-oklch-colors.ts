import Color from "colorjs.io";

interface Step {
  coordinates: { x: number; y: number };
  colors: [r: number, g: number, b: number];
}

export function* generateColors(
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
): Generator<Step> {
  const color = new Color("oklch", [0.5, 0.2, hue]);
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      color.c = (x / width) * 0.4; // chroma goes to 0.4
      color.l = 1 - y / height;
      yield {
        coordinates: { x, y },
        colors: color.to(colorSpace === "srgb" ? "srgb" : "p3").coords,
      };
    }
  }
}
