import { LitElement, html, css } from "lit";
import { customElement, property, eventOptions } from "lit/decorators.js";
import { query } from "lit/decorators/query.js";

import { colorController } from "../color-controller";

import { createGenerateColors } from "./generate-lch-colors";

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

@customElement("lch-paint")
export class LCHPaint extends LitElement {
  @property({ type: Number })
  width = 300;
  @property({ type: Number })
  height = 200;

  @query("canvas")
  canvas?: HTMLCanvasElement | null;

  @query(".marker")
  marker?: HTMLDivElement | null;

  isPressed = false;

  #_generateColors?: ReturnType<typeof createGenerateColors>;
  get generateColors() {
    if (this.#_generateColors) {
      return this.#_generateColors;
    }

    const canvas = this.canvas;
    if (!canvas) {
      return undefined;
    }
    this.#_generateColors = createGenerateColors(
      canvas.transferControlToOffscreen(),
    );
    return this.#_generateColors;
  }

  @eventOptions({ passive: true })
  onPositionChange(event: PointerEvent) {
    const canvas = this.canvas;
    if (!canvas || !this.isPressed) {
      return;
    }
    const rect = canvas.getBoundingClientRect();

    const x = Math.min(Math.max(event.clientX - rect.x, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.y, 0), rect.height);

    const l = Math.floor((1 - y / rect.height) * 100);
    const c = Math.floor((x / rect.width) * 150);

    colorController([
      {
        type: "lch",
        kind: "l",
        value: l,
      },
      {
        type: "lch",
        kind: "c",
        value: c,
      },
    ]);
  }

  updateMarkerPosition = () => {
    const marker = this.marker;
    const canvas = this.canvas;
    if (!marker || !canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const lch = colorController().to("lch");
    const x = Math.floor((clamp(0, lch.c, 150) / 150) * rect.width);
    const y = Math.floor((1 - clamp(0, lch.l, 100) / 100) * rect.height);

    marker.style.cssText = `transform: translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
  };

  updateCanvasColors = () => {
    const lch = colorController().to("lch");
    this.generateColors?.(lch.h, this.width, this.height);
  };

  constructor() {
    super();
    colorController.on(() => {
      this.updateCanvasColors();
      this.updateMarkerPosition();
    });
  }

  override firstUpdated() {
    this.updateMarkerPosition();
  }

  override updated(changed: Map<string, any>) {
    if (changed.has("width") || changed.has("height")) {
      this.updateCanvasColors();
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <canvas
          @pointerdown=${(event: PointerEvent) => {
            // If we were pressing on the canvas and the mouse moved out of the canvas, it’ll keep the canvas focused
            (event.currentTarget as HTMLCanvasElement).setPointerCapture(
              event.pointerId,
            );
            this.isPressed = true;
            this.onPositionChange(event);
          }}
          @pointermove=${this.onPositionChange}
          @pointerup=${(event: PointerEvent) => {
            // On pointer up, we can release the pointer
            (event.currentTarget as HTMLCanvasElement).releasePointerCapture(
              event.pointerId,
            );
            this.isPressed = false;
          }}
          width="${this.width}px"
          height="${this.height}px"
        ></canvas>
        <div class="marker"></div>
      </div>
    `;
  }

  static override styles = css`
    :host canvas {
      border-radius: 5px;
      border: 1px solid grey;
      width: 100%;
      /* Avoid making the page scroll on mobile when we are pressing on it */
      touch-action: none;
    }

    :host .wrapper {
      position: relative;
    }

    :host .marker {
      position: absolute;
      top: 0px;
      left: 0px;
      pointer-events: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow:
        0px 0px 0px 0.5px var(--black),
        inset 0px 0px 0px 0.5px var(--white);
      z-index: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "lch-paint": LCHPaint;
  }
}
