import { generateColors } from "./generate-lch-colors";

function send(message: Uint8ClampedArray) {
  postMessage(message);
}

onmessage = function (event: MessageEvent<[number, number, number]>) {
  const [hue, width, height] = event.data;

  const colorArray = new Uint8ClampedArray(width * height * 4);

  for (const { coordinates, colors } of generateColors(hue, width, height)) {
    const position = 4 * (coordinates.y * width + coordinates.x);
    colorArray[position + 0] = colors.r; // R value
    colorArray[position + 1] = colors.g; // G value
    colorArray[position + 2] = colors.b; // B value
    colorArray[position + 3] = 255; // A value
  }

  send(colorArray);
};
