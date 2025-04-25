export type TileId = string;

export type Position = [number, number];

export type Tile = {
  id?: TileId;
  position: Position;
  value: number;
};
