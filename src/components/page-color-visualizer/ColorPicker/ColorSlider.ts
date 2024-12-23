import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import Color from "colorjs.io";
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
  box-shadow:
    0 0 0 ${borderWidth}px var(--black),
    inset 0 0 0 ${borderWidth}px var(--white);
  border-radius: 3px;
  cursor: pointer;
`;

// Use both the previous and the current to avoid flickers on FF / Safari
const trackBackground = css`var(--track-background, #9e9e9e)`;
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
  referenceColor: Color = new Color("srgb", [0, 0, 0]);
  @state()
  valueToModify: Kind[Type] = "h";

  prevColor?: string;
  prevBackgroundRange?: string;
  timePrevOp?: number;
  throttleId?: number;

  getBackgroundRange = () => {
    const coord = this.referenceColor.space.coords[this.valueToModify];
    if (!coord) {
      return this.prevBackgroundRange;
    }
    const range = coord.refRange || coord.range;
    if (!range) {
      return this.prevBackgroundRange;
    }

    const from = new Color(this.referenceColor);
    from[this.valueToModify] = range[0];

    const to = new Color(this.referenceColor);
    to[this.valueToModify] = range[1];

    const stops = Color.steps(
      from.range(to, { space: this.referenceColor.space.id, hue: "raw" }),
      { steps: 50 },
    );

    this.prevBackgroundRange = `linear-gradient(to right, ${stops.join(", ")})`;
    return this.prevBackgroundRange;
  };

  override render() {
    return html`<input
      .min=${this.min}
      .max=${this.max}
      .step=${this.step}
      .value=${this.value}
      style="--track-background: ${this.getBackgroundRange()}"
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
