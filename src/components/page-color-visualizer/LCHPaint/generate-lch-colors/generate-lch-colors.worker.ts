import { generateColors } from "./generate-lch-colors";

let offscreenCanvas: OffscreenCanvas | undefined;

type Message = [
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
];

let lastSuccessfulMessage: Message | undefined;

let isDrawing = false;
let queuedMessage: Message | undefined;

onmessage = function handleMessage(
  event: MessageEvent<Message | OffscreenCanvas>
) {
  if (event.data instanceof OffscreenCanvas) {
    offscreenCanvas = event.data;
    return;
  }

  if (!offscreenCanvas) {
    return;
  }

  if (isDrawing) {
    queuedMessage = event.data;
    return;
  }
  isDrawing = true;

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

  const imageData = new ImageData(colorArray, width, height, {
    colorSpace: "display-p3",
  });

  lastSuccessfulMessage = event.data;
  ctx.putImageData(imageData, 0, 0);
  // ctx.putImageData takes some time to finish
  setTimeout(() => {
    isDrawing = false;
  });

  if (queuedMessage) {
    const m = queuedMessage;
    queuedMessage = undefined;
    handleMessage.call(this, { data: m } as MessageEvent<
      Message | OffscreenCanvas
    >);
  }
};
