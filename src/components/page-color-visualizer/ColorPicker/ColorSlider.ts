import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { type ColorSpaceObject, rgb } from "d3-color";
import type { Kind, Type } from "../color-controller";

const height = 20;
const offset = 1;
const borderWidth = 1;
const borderColor = css`var(--contrast)`;

const thumbWidth = 14;
const thumbStyles = css`
  width: ${thumbWidth}px;
  height: ${height + offset * 2}px;
  background: #00000000;
  box-shadow: 0 0 0 ${borderWidth}px var(--black),
    inset 0 0 0 ${borderWidth}px var(--white);
  border-radius: 3px;
  cursor: pointer;
`;

// Use both the previous and the current to avoid flickers on FF / Safari
const trackBackground = css`var(--track-background, #9e9e9e), var(--previous-track-background, #9e9e9e)`;
// const trackBackgroundHover = css`var(--track-background-hover, #bbbbbb)`;
// const trackBackgroundFocus = css`var(--track-background-focus, #cbcbcb)`;
const trackStyles = css`
  background: ${trackBackground};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 0 0 0 ${borderWidth}px ${borderColor};
  border-radius: 3px;
  width: 100%;
  height: ${height}px;
  cursor: pointer;
`;

@customElement("color-slider")
export class ColorSlider extends LitElement {
  @property({ type: Number, reflect: true })
  min: number = 0;
  @property({ type: Number, reflect: true })
  max: number = 100;
  @property({ type: Number, reflect: true })
  step: number = 1;
  @property({ type: Number, reflect: true })
  value: number | undefined;

  @state()
  referenceColor: ColorSpaceObject = rgb(0, 0, 0);
  @state()
  valueToModify: Kind[Type] = "h";

  prevColor?: string;
  prevBackgroundRange?: string;
  timePrevOp?: number;
  throttleId?: number;

  getBackgroundRange = () => {
    clearTimeout(this.throttleId);
    const color = this.referenceColor.copy();
    const colorToCompare: Record<string, any> = { ...color };
    delete colorToCompare[this.valueToModify];
    const stringColorToCompare = JSON.stringify(colorToCompare);
    if (this.prevBackgroundRange) {
      // If the color hasn't changed, no need to re-compute
      if (this.prevColor === stringColorToCompare) {
        return this.prevBackgroundRange;
      }
      const now = performance.now();
      // Only compute every 100ms
      if (this.timePrevOp != null && now - this.timePrevOp < 100) {
        // Start a timeout of 100ms so that if the last update was cancelled, we'll still have a correct render
        this.throttleId = window.setTimeout(() => this.requestUpdate(), 100);
        return this.prevBackgroundRange;
      }
    }

    const nbOfPoints = Math.round((this.max - this.min) / this.step);

    const colorArray = new Uint8ClampedArray(nbOfPoints * 4);
    for (let i = 0; i <= nbOfPoints; i++) {
      // @ts-ignore
      color[this.valueToModify] = i * this.step + this.min;
      const rgb = color.rgb();
      const position = 4 * i;
      colorArray[position + 0] = rgb.r; // R value
      colorArray[position + 1] = rgb.g; // G value
      colorArray[position + 2] = rgb.b; // B value
      colorArray[position + 3] = 255; // A value
    }

    const canvas = document.createElement("canvas");
    canvas.width = nbOfPoints;
    canvas.height = 1;

    const imageData = new ImageData(colorArray, nbOfPoints, 1);
    const ctx = canvas.getContext("2d", { alpha: false })!;
    ctx.putImageData(imageData, 0, 0);

    const dataUrl = canvas.toDataURL();
    this.prevBackgroundRange = dataUrl;
    this.prevColor = stringColorToCompare;
    this.timePrevOp = performance.now();
    return dataUrl;
  };

  override render() {
    return html`<input
      .min=${this.min}
      .max=${this.max}
      .step=${this.step}
      .value=${this.value}
      style="--previous-track-background: url(${this
        .prevBackgroundRange}); --track-background: url(${this.getBackgroundRange()})"
      type="range"
      @input=${(event: Event) => {
        const element = event.target as HTMLInputElement;
        const v = Number(element.value);
        this.value = Number.isNaN(v) ? undefined : v;
      }}
    />`;
  }

  static override styles = css`
    :host input[type="range"] {
      width: 100%;
      margin: 0.5px 0;
      background-color: transparent;
      -webkit-appearance: none;
    }

    :host input[type="range"]::-webkit-slider-runnable-track {
      ${trackStyles}
    }
    :host input[type="range"]::-moz-range-track {
      ${trackStyles}
    }

    :host input[type="range"]::-moz-range-thumb {
      ${thumbStyles}
    }
    :host input[type="range"]::-webkit-slider-thumb {
      ${thumbStyles}
      margin-top: -${offset}px;
      -webkit-appearance: none;
    }

    :host input[type="range"]:focus {
      outline: none;
    }

    :host input[type="range"]:hover::-moz-range-thumb {
      background: #00000044;
    }
    :host input[type="range"]:hover::-webkit-slider-thumb {
      background: #00000044;
    }
    :host input[type="range"]:focus-visible::-moz-range-thumb {
      outline: -moz-mac-focusring auto 1px;
      outline-offset: 1px;
    }
    :host input[type="range"]:focus-visible::-webkit-slider-thumb {
      outline: -webkit-focus-ring-color auto 1px;
      outline-offset: 1px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "color-slider": ColorSlider;
  }
}
