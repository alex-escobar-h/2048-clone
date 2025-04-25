import { Tile, TileId } from './tile.types';

export type Board = TileId[][];

export type TileMap = Record<TileId, Tile>;
