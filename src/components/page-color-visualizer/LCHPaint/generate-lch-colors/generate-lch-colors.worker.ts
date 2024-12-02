import { generateColors } from "./generate-lch-colors";
import { createScheduler } from "../../worker-utils";

let offscreenCanvas: OffscreenCanvas | undefined;

type Message = [
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
];

const scheduler = createScheduler();
let lastSuccessfulMessage: Message | undefined;

onmessage = async function (event: MessageEvent<Message | OffscreenCanvas>) {
  const key = {};
  scheduler.start(key);
  if (event.data instanceof OffscreenCanvas) {
    offscreenCanvas = event.data;
    return;
  }

  if (!offscreenCanvas) {
    return;
  }

  const [hue, width, height, colorSpace] = event.data;

  if (
    lastSuccessfulMessage &&
    lastSuccessfulMessage[0] === hue &&
    lastSuccessfulMessage[1] === width &&
    lastSuccessfulMessage[2] === height &&
    lastSuccessfulMessage[3] === colorSpace
  ) {
    return;
  }

  const ctx = offscreenCanvas.getContext("2d", { colorSpace: "display-p3" });
  if (!ctx) {
    return;
  }

  const colorArray = new Uint8ClampedArray(width * height * 4);

  // Is a for await loop, so that we can insert a new event in the middle of the loop
  for await (const { coordinates, colors } of generateColors(
    hue,
    width,
    height,
    colorSpace
  )) {
    if (!scheduler.shouldRun(key)) {
      return;
    }
    const position = 4 * (coordinates.y * width + coordinates.x);
    colorArray[position + 0] = colors[0] * 255; // X in P3
    colorArray[position + 1] = colors[1] * 255; // Y in P3
    colorArray[position + 2] = colors[2] * 255; // Z in P3
    colorArray[position + 3] = 255; // A value
  }

  if (!scheduler.shouldRun(key)) {
    return;
  }

  const imageData = new ImageData(colorArray, width, height, {
    colorSpace: "display-p3",
  });

  if (!scheduler.shouldRun(key)) {
    return;
  }

  lastSuccessfulMessage = event.data;
  ctx.putImageData(imageData, 0, 0);
};
