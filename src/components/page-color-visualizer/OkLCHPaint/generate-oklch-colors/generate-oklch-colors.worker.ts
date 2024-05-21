import { generateColors } from "./generate-oklch-colors";

function send(message: Uint8ClampedArray) {
  postMessage(message);
}

onmessage = function (
  event: MessageEvent<[number, number, number, "srgb" | "display-p3"]>
) {
  const [hue, width, height, colorSpace] = event.data;

  const colorArray = new Uint8ClampedArray(width * height * 4);

  for (const { coordinates, colors } of generateColors(
    hue,
    width,
    height,
    colorSpace
  )) {
    const position = 4 * (coordinates.y * width + coordinates.x);
    colorArray[position + 0] = colors[0] * 255; // X in P3
    colorArray[position + 1] = colors[1] * 255; // Y in P3
    colorArray[position + 2] = colors[2] * 255; // Z in P3
    colorArray[position + 3] = 255; // A value
  }

  send(colorArray);
};
