import * as React from "react";

import type { Packing } from "./packings/types";
import { hexagon } from "./packings/hexagon";

import type { NativeHostProps } from "./Host";
import { Host } from "./Host";

interface HostPackProps extends NativeHostProps {
  number?: number;
  x?: number;
  y?: number;
  radius?: number;
  spacing?: number;
  packingFn?: Packing;
  rotation?: number;
}

const PackContext = React.createContext<Packing>(hexagon);

const RenderWithPacking = React.memo(
  ({
    radius,
    spacing,
    n,
    x,
    y,
    rotation,
    children,
  }: {
    radius: number;
    spacing: number;
    n: number;
    x: number;
    y: number;
    rotation: number;
    children: (args: { correctedX: number; correctedY: number }) => JSX.Element;
  }) => {
    const packingFn = React.useContext(PackContext);
    const [correctedX, correctedY] = packingFn({
      radius,
      spacing,
      n,
      origin: [x, y],
      rotation,
    });
    return children({ correctedX, correctedY });
  }
);

export const HostPack = ({
  number = 0,
  x = 0,
  y = 0,
  radius = 0,
  spacing = 0,
  packingFn = hexagon,
  rotation = 0,
  ...props
}: HostPackProps) => {
  const renderHost = React.useCallback(
    ({
      correctedX,
      correctedY,
    }: {
      correctedX: number;
      correctedY: number;
    }) => (
      <Host
        {...props}
        x={correctedX}
        y={correctedY}
        radius={radius}
        rotation={rotation}
      />
    ),
    [radius, rotation, ...Object.entries(props).flat(1)]
  );
  return (
    <PackContext.Provider value={packingFn}>
      {Array(number)
        .fill(0)
        .map((_, i) => {
          const n = i + 1;

          return (
            <RenderWithPacking
              key={i}
              radius={radius}
              spacing={spacing}
              n={n}
              x={x}
              y={y}
              rotation={rotation}
            >
              {renderHost}
            </RenderWithPacking>
          );
        })}
    </PackContext.Provider>
  );
};
