import * as React from "react";
import { Stage, Layer } from "react-konva";

import { useAutochangingNumber } from "./packings/hexagon";

import { HostPack } from "./HostPack";
import type Konva from "konva";

export function PageHexagonsWithoutRules() {
  const size = 200;
  const offset = size / 2;

  const [number, setNumber] = React.useState(1);
  const [angle, setAngle] = React.useState(60);
  const [zoom, setZoom] = React.useState(0.5);
  const [x, sX] = React.useState((size * 3) / 4);
  const [y, sY] = React.useState((size * 3) / 4);

  const [play, setPlay] = React.useState(false);
  useAutochangingNumber({ number, setNumber, play });

  const scaleFromZoom = (zoom: number) => ({ x: zoom, y: zoom });

  const initCoordRef = React.useRef<{
    canvas: { x: number; y: number };
    event: { x: number; y: number };
  } | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const prevCursorRef = React.useRef<string | undefined>(undefined);

  const defferedAngle = React.useDeferredValue(angle);
  const defferedNumber = React.useDeferredValue(number);

  return (
    <>
      <Stage
        ref={(stage) => {
          containerRef.current = stage?.container() || null;
        }}
        width={size}
        height={size}
        x={x - offset}
        y={y - offset}
        scale={scaleFromZoom(zoom)}
        onPointerDown={({ evt: event, pointerId }) => {
          initCoordRef.current = {
            canvas: { x, y },
            event: { x: event.clientX, y: event.clientY },
          };
          (event.target as HTMLCanvasElement).setPointerCapture(pointerId);
        }}
        onPointerUp={({ evt: event, pointerId }) => {
          initCoordRef.current = null;
          (event.target as HTMLCanvasElement).releasePointerCapture(pointerId);
          if (prevCursorRef.current !== undefined) {
            containerRef.current!.style.cursor = prevCursorRef.current;
            prevCursorRef.current = undefined;
          }
        }}
        onPointerMove={({ evt: event }) => {
          const isPressed = event.pressure > 0;
          if (isPressed) {
            if (prevCursorRef.current === undefined) {
              prevCursorRef.current = containerRef.current!.style.cursor;
              containerRef.current!.style.cursor = "move";
            }
            sX(
              initCoordRef.current!.canvas.x +
                event.clientX -
                initCoordRef.current!.event.x,
            );
            sY(
              initCoordRef.current!.canvas.y +
                event.clientY -
                initCoordRef.current!.event.y,
            );
          }
        }}
        onWheel={({ evt: event, currentTarget }) => {
          // stop default scrolling
          event.preventDefault();

          const scaleBy = 1.1;

          const stage = currentTarget as Konva.Stage;

          const pointer = stage.getPointerPosition()!;

          // how to scale? Zoom in? Or zoom out?
          let direction = event.deltaY > 0 ? -1 : 1;

          const newZoom = direction > 0 ? zoom * scaleBy : zoom / scaleBy;
          setZoom(newZoom);

          const mousePointTo = {
            x: (pointer.x - x + offset) / zoom,
            y: (pointer.y - y + offset) / zoom,
          };
          sX(pointer.x - mousePointTo.x * newZoom + offset);
          sY(pointer.y - mousePointTo.y * newZoom + offset);
        }}
      >
        <Layer>
          <HostPack
            number={defferedNumber}
            stroke="red"
            strokeWidth={0}
            radius={10}
            x={offset}
            y={offset}
            spacing={1}
            rotation={defferedAngle}
          />
        </Layer>
      </Stage>
      <label>
        number ({number}):
        <br />
        <input
          type="range"
          min={1}
          max={10331}
          value={number}
          onChange={(event) => {
            setPlay(false);
            setNumber(Number(event.target.value));
          }}
        />
      </label>
      <button
        onClick={() => {
          setPlay(false);
          setNumber((n) => Math.max(1, n - 1));
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setPlay(false);
          setNumber((n) => Math.min(311, n + 1));
        }}
      >
        +
      </button>
      <button onClick={() => setPlay((p) => !p)}>{play ? "⏸" : "▶"}</button>
      <br />
      <label>
        angle ({angle}):
        <br />
        <input
          type="range"
          min={0}
          max={180}
          value={angle}
          onChange={(event) => {
            setAngle(Number(event.target.value));
          }}
        />
      </label>
    </>
  );
}
