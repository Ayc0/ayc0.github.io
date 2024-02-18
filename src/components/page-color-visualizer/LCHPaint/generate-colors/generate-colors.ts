import { hcl } from "d3-color";

interface Step {
  coordinates: { x: number; y: number };
  colors: {
    r: number;
    g: number;
    b: number;
  };
}

export function* generateColors(
  hue: number,
  width: number,
  height: number
): Generator<Step> {
  const color = hcl(hue, 0, 0);
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      color.c = Math.floor((x / width) * 132); // chroma goes to 132
      color.l = Math.floor((1 - y / height) * 100);
      yield {
        coordinates: { x, y },
        colors: color.rgb(),
      };
    }
  }
}
