import "./LCHPaint/LCHPaint.ts";
import "./ColorPicker/ColorPicker.ts";
import { colorController } from "./color-controller.ts";

document.documentElement.style.backgroundColor = colorController()
  .to("srgb")
  .toString();

colorController.on((raw) => {
  document.documentElement.style.backgroundColor = raw.to("srgb").toString();
});
