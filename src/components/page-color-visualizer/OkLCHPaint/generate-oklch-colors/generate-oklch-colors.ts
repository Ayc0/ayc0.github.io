import Color from "colorjs.io";

interface Step {
  coordinates: { x: number; y: number };
  colors: [number, number, number];
}

function task(cb: () => void) {
  const mc = new MessageChannel();
  mc.port1.postMessage(null);
  mc.port2.addEventListener(
    "message",
    function taskCallback() {
      cb();
    },
    { once: true }
  );
  mc.port2.start();
}

export async function* generateColors(
  hue: number,
  width: number,
  height: number,
  colorSpace: "srgb" | "display-p3"
): AsyncGenerator<Step> {
  const color = new Color("oklch", [0.5, 0.2, hue]);
  for (let x = 0; x < width; x += 1) {
    // Add some timeouts to allow injecting a break within the loop, for new events
    if (x !== 0) {
      await new Promise<void>((resolve) => task(resolve));
    }
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
