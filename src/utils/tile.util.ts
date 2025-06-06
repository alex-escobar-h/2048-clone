import { Board, Position, Tile, TileAction, TileId, TileMap } from '../types';
import { GameState } from '../reducers/gameReducer';
import { v4 as uuid } from 'uuid';

export const createTile = (state: GameState, action: TileAction): GameState => {
  const id: TileId = uuid(); // Unique ID
  const [col, row]: Position = action.tile.position; // extract pos
  // Create deep copy of board
  const board: Board = JSON.parse(JSON.stringify(state.board));
  board[row][col] = id; // set the id on the board
  const tile: Tile = { ...action.tile, id };
  const tileMap: TileMap = {
    ...state.tileMap,
    [id]: tile, // update tilemap with new tile
  };
  const activeTilesIds = [...state.activeTilesIds, id];
  return {
    ...state,
    board,
    tileMap,
    activeTilesIds,
  };
};

export const getRandomTilePosition = (position: Position[]) => {
  const randomIdx = Math.floor(Math.random() * position.length);
  return position[randomIdx];
};

export const getRandomTileValue = () => {
  return Math.random() < 0.15 ? 4 : 2;
};
