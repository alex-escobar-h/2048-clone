export type TileId = string;

export type Position = [col: number, row: number];

export type Tile = {
  id?: TileId;
  position: Position;
  value: number;
};
