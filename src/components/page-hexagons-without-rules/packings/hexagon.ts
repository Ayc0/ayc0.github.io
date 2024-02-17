import * as React from "react";
import type { Point, Packing } from "./types";

export const sizeOfPack = (n: number) => 3 * (n - 1) * n + 1;
export const outerLayerOfSize = (n: number) => 6 * (n - 1) || 1;
export const layerOfElement = (n: number) =>
  Math.ceil(Math.fround(1 / 2 + Math.sqrt(4 * n - 1) / (2 * Math.sqrt(3))));

export const hexagon: Packing = ({
  n = 1,
  radius = 10,
  origin: [x, y] = [0, 0],
  spacing = 0,
  rotation = 0
}) => {
  if (n === 1) {
    return [x, y];
  }
  const currentLayer = layerOfElement(n);
  const sizeOfThisPack = sizeOfPack(currentLayer);
  const sizeOfThisLayer = outerLayerOfSize(currentLayer);
  const sizeOfPreviousPack = sizeOfThisPack - sizeOfThisLayer;

  // Avoid weird spike
  if (n === sizeOfThisPack) {
    n = sizeOfPreviousPack + 1;
  } else {
    n += 1;
  }

  const offset = n - sizeOfPreviousPack - 1;
  const anchorAngle = Math.floor((6 * offset) / sizeOfThisLayer) * 60;
  const getXY = (angle: number, distance: number, point: Point): Point => {
    const [x, y] = point;
    const angleInRad = ((angle + rotation) * Math.PI) / 180;
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const anchorOffsetFromCenter = distance * (radius * Math.sqrt(3) + spacing);
    return [x + cos * anchorOffsetFromCenter, y + sin * anchorOffsetFromCenter];
  };
  const [anchorX, anchorY] = getXY(anchorAngle, currentLayer - 1, [x, y]);

  const angle = anchorAngle + 120;
  // const offsetFromAnchor = Math.floor(offset / 6);
  const offsetFromAnchor = offset % (sizeOfThisLayer / 6);
  return getXY(angle, offsetFromAnchor, [anchorX, anchorY]);
};

export function useAutochangingNumber({
  number,
  setNumber,
  play
}: {
  number: number;
  setNumber: (cb: (n: number) => number) => void;
  play: boolean;
}) {
  const coef = React.useRef(1);
  React.useLayoutEffect(() => {
    if (!play) {
      return;
    }
    const id = setTimeout(() => {
      setNumber((n) => {
        if (n <= 1) {
          coef.current = 1;
        }
        if (n >= 331) {
          coef.current = -1;
        }
        return n + coef.current * 1;
      });
    }, 1000 / outerLayerOfSize(layerOfElement(number)));
    return () => {
      clearTimeout(id);
    };
  }, [play, number, setNumber]);
}
