import "./LCHPaint/LCHPaint.ts";
import "./ColorPicker/ColorPicker.ts";
import { colorController } from "./color-controller.ts";

document.documentElement.style.backgroundColor =
  colorController().rgb.raw.formatHex();

colorController.on(({ rgb }) => {
  document.documentElement.style.backgroundColor = rgb.raw.formatHex();
});
