export type Point = [number, number];

export interface PackingParams {
  n: number;
  rotation: number;
  radius: number;
  origin: Point;
  spacing: number;
}

export type Packing = (params: PackingParams) => Point;
