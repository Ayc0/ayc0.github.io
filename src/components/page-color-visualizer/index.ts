import "./LCHPaint/LCHPaint.ts";
import "./OkLCHPaint/OkLCHPaint.ts";
import "./ColorPicker/ColorPicker.ts";
import { colorController } from "./color-controller.ts";

document.documentElement.style.backgroundColor = colorController().toString();

colorController.on((raw) => {
  document.documentElement.style.backgroundColor = raw.toString();
});
