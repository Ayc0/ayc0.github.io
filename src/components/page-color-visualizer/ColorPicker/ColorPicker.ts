import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

import type { ColorSlider } from "./ColorSlider";
import "./ColorSlider";

import { colorController, type Type, type Kind } from "../color-controller";
import { ManateaController } from "../manatea-controller";

function toHex(color: number) {
  return Math.floor(color).toString(16).padStart(2, "0");
}

function toFixed(number: number, decimal: number = 2) {
  const dec = 10 ** decimal;
  return Math.round(number * dec) / dec;
}

const view = window.matchMedia("(max-width: 595px)");

@customElement("color-picker")
export class ColorPicker extends LitElement {
  // To auto update when the color changes
  lchController = new ManateaController(this, colorController);

  @state()
  isMobile: boolean = view.matches;

  viewListener = (mqle: MediaQueryListEvent) => {
    this.isMobile = mqle.matches;
  };

  constructor() {
    super();
    view.addListener(this.viewListener);
  }

  override disconnectedCallback() {
    view.removeListener(this.viewListener);
  }

  renderInput<T extends Type>({
    category,
    kind,
    label,
    shortName = kind.toUpperCase(),
    min,
    max,
    step = 1,
    mod = (v) => v,
    unit = "",
  }: {
    category: T;
    kind: Kind[T];
    label: string;
    shortName?: string;
    min: number;
    max: number;
    step?: number;
    mod?: (v: number) => number;
    unit?: string;
  }) {
    const clamp = (n: number) => Math.min(max, Math.max(min, n));

    const stored = colorController();
    // @ts-expect-error
    const value = stored[category].values[kind];

    const id = `${category}--${kind}`;

    return html`
      <label for="slider-${id}">${shortName} (${label})</label>
      <color-slider
        .id="slider-${id}"
        .min=${min}
        .max=${max}
        .step=${step}
        .value=${value}
        .referenceColor=${stored[category].raw}
        .valueToModify=${kind}
        @input=${(event: Event) => {
          const element = event.target as ColorSlider;
          const newValue = clamp(element.value || 0);
          element.value = newValue;
          colorController([
            {
              type: category,
              kind,
              value: newValue,
            },
          ]);
        }}
      ></color-slider>
      <span
        >${toFixed(
          mod(value),
          Math.floor(-Math.log(step) / Math.log(10))
        )}${unit}</span
      >
    `;
  }

  override willUpdate(changed: Map<string, any>) {
    const keys = new Set(changed.keys());
    keys.delete("luminance");
    keys.delete("chroma");
    keys.delete("hue");

    // Only update if the update was related to LCH, otherwise no
    if (keys.size === 0) {
      // lchCup();
    }
  }

  override render() {
    const stored = colorController();
    const hexRGB = `#${toHex(stored.rgb.values.r)}${toHex(
      stored.rgb.values.g
    )}${toHex(stored.rgb.values.b)}`;
    return html`
      <div class="wrapper">
        <details open>
          <summary><h2>LCH</h2></summary>
          <div class="group">
            ${this.renderInput({
              category: "lch",
              kind: "l",
              label: "luminance",
              min: 0,
              max: 100,
              unit: "º",
            })}
            ${this.renderInput({
              category: "lch",
              kind: "c",
              label: "chroma",
              min: 0,
              max: 132,
            })}
            ${this.renderInput({
              category: "lch",
              kind: "h",
              label: "hue",
              min: 0,
              max: 360,
            })}

            <pre class="code-wrapper"><code class="code">LCH(${toFixed(
              stored.lch.values.l
            )}% ${toFixed(stored.lch.values.c)} ${toFixed(
              stored.lch.values.h
            )})</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>Lab</h2></summary>
          <div class="group">
            ${this.renderInput({
              category: "lab",
              kind: "l",
              label: "luminance",
              min: 0,
              max: 100,
              unit: "º",
            })}
            ${this.renderInput({
              category: "lab",
              kind: "a",
              label: "a",
              shortName: "a",
              min: -128,
              max: 127,
            })}
            ${this.renderInput({
              category: "lab",
              kind: "b",
              label: "b",
              shortName: "b",
              min: -128,
              max: 127,
            })}

            <pre class="code-wrapper"><code class='code'>Lab(${toFixed(
              stored.lab.values.l
            )}% ${toFixed(stored.lab.values.a)} ${toFixed(
              stored.lab.values.b
            )})</code></pre>
          </div>
        </details>
        <!--  -->
        <details ?open=${!this.isMobile}>
          <summary><h2>RGB</h2></summary>
          <div class="group">
            ${this.renderInput({
              category: "rgb",
              kind: "r",
              label: "red",
              min: 0,
              max: 255,
            })}
            ${this.renderInput({
              category: "rgb",
              kind: "g",
              label: "green",
              min: 0,
              max: 255,
            })}
            ${this.renderInput({
              category: "rgb",
              kind: "b",
              label: "blue",
              min: 0,
              max: 255,
            })}

            <pre class="code-wrapper"><code class='code'>rgb(${toFixed(
              stored.rgb.values.r
            )} ${toFixed(stored.rgb.values.g)} ${toFixed(
              stored.rgb.values.b
            )})</code>
<code class='code'>${hexRGB}</code></pre>
          </div>
        </details>

        <details ?open=${!this.isMobile}>
          <summary><h2>HSL</h2></summary>
          <div class="group">
            ${this.renderInput({
              category: "hsl",
              kind: "h",
              label: "hue",
              min: 0,
              max: 360,
            })}
            ${this.renderInput({
              category: "hsl",
              kind: "s",
              label: "saturation",
              min: 0,
              step: 0.01,
              max: 1,
              mod: (v) => v * 100,
              unit: "%",
            })}
            ${this.renderInput({
              category: "hsl",
              kind: "l",
              label: "lightness",
              min: 0,
              step: 0.01,
              max: 1,
              mod: (v) => v * 100,
              unit: "%",
            })}

            <pre class="code-wrapper"><code class='code'>hsl(${toFixed(
              stored.hsl.values.h
            )} ${toFixed(stored.hsl.values.s) * 100}% ${toFixed(
              stored.hsl.values.l * 100
            )}%)</code></pre>
          </div>
        </details>
      </div>
    `;
  }

  static override styles = css`
    :host label {
      display: block;
    }

    :host .wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 1em;
      column-gap: 2em;
      margin-bottom: 1em;
    }
    @media (max-width: 595px) {
      :host .wrapper {
        grid-template-columns: 1fr;
      }
    }

    :host .group {
      display: grid;
      grid-template-columns: 1fr 5ch;
      grid-template-rows: repeat(6, auto) 1fr;
      column-gap: 1em;
      row-gap: 0.5em;

      margin-top: 1em;
    }

    :host h2 {
      display: inline-block;
      margin: 0;
    }

    :host label {
      grid-column: span 2;
    }

    :host color-slider {
      /* Avoid making the page scroll on mobile when we are pressing on it */
      touch-action: none;
    }

    :host .code-wrapper {
      grid-column: span 2;
    }
    :host .code {
      font-family: "Fira Code", monospace;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "color-picker": ColorPicker;
  }
}
