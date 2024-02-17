import * as React from "react";
import { RegularPolygon } from "react-konva";

interface BaseHostProps {
  x: number;
  y: number;
  radius: number;
  rotation: number;
}

export interface NativeHostProps {
  stroke?: string;
  strokeWidth?: number;
}

interface HostProps extends BaseHostProps, NativeHostProps {}

export const Host = ({ x, y, radius, rotation, ...props }: HostProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const color = isHovered ? "#bbb" : "#ccc";
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node || !isHovered) {
      return;
    }
    const prevCursor = node.style.cursor;
    node.style.cursor = "pointer";
    return () => {
      node.style.cursor = prevCursor;
    };
  }, [isHovered]);

  return (
    <RegularPolygon
      ref={(polygon) => {
        containerRef.current = polygon?.getStage()?.container() || null;
      }}
      {...props}
      perfectDrawEnabled={false}
      x={x}
      y={y}
      radius={radius}
      onPointerEnter={({ evt: event, pointerId }) => {
        if ((event.target as HTMLCanvasElement).hasPointerCapture(pointerId)) {
          return;
        }
        setIsHovered(true);
      }}
      onPointerLeave={({ evt: event, pointerId }) => {
        if ((event.target as HTMLCanvasElement).hasPointerCapture(pointerId)) {
          return;
        }
        setIsHovered(false);
      }}
      sides={6}
      rotation={rotation}
      fill={color}
    />
  );
};
