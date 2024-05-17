import Color from "colorjs.io";

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
  const color = new Color("lch", [50, 50, hue]);
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      color.c = Math.floor((x / width) * 132); // chroma goes to 132
      color.l = Math.floor((1 - y / height) * 100);
      const rgb = color.to("srgb");
      yield {
        coordinates: { x, y },
        colors: {
          r: Math.floor(rgb.r * 255),
          g: Math.floor(rgb.g * 255),
          b: Math.floor(rgb.b * 255),
        },
      };
    }
  }
}
