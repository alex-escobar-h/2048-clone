import { GameState } from '../reducers/gameReducer';
import { Axis, Board, MoveOptions, Position, Tile, TileMap } from '../types';
import { createBoard } from './board.util';
import { BOARD_DIMENSION } from './constant';

export const getCoord = (
  axis: Axis,
  outer: number,
  inner: number
): [number, number] => (axis === 'row' ? [inner, outer] : [outer, inner]);

export const moveTiles = (
  state: GameState,
  { axis, direction }: MoveOptions
): GameState => {
  console.log('moveTiles');
  const newBoard: Board = createBoard();
  const newTileMap: TileMap = {};
  let { score } = state;
  let hasBoardChanged = false;

  const size = BOARD_DIMENSION;
  const outerLoop = [...Array(size).keys()];
  const innerLoop = [...Array(size).keys()];
  if (direction === 'backward') innerLoop.reverse();

  for (const outer of outerLoop) {
    let cursor = direction === 'forward' ? 0 : size - 1;
    let prevTile: Tile | null = null;

    for (const inner of innerLoop) {
      const [col, row] = getCoord(axis, outer, inner);
      const tileId = state.board[row][col];
      if (!tileId) continue;

      const curTile = state.tileMap[tileId];

      if (prevTile && prevTile.value === curTile.value) {
        const mergedValue = prevTile.value * 2;
        score += mergedValue;

        const prevId = prevTile.id!;
        newTileMap[prevId] = {
          ...prevTile,
          value: mergedValue,
        };

        newTileMap[tileId] = {
          ...curTile,
          position: prevTile.position,
        };

        prevTile = null;
        hasBoardChanged = true;
      } else {
        const newPos: Position = getCoord(axis, outer, cursor);
        newBoard[newPos[1]][newPos[0]] = tileId;

        newTileMap[tileId] = {
          ...curTile,
          position: newPos,
        };

        if (
          curTile.position[0] !== newPos[0] ||
          curTile.position[1] !== newPos[1]
        ) {
          hasBoardChanged = true;
        }

        prevTile = newTileMap[tileId];
        cursor += direction === 'forward' ? 1 : -1;
      }
    }
  }
  const updatedState = {
    ...state,
    board: newBoard,
    tileMap: newTileMap,
    score,
    hasBoardChanged,
  };
  console.log(updatedState); // TODO: Delete
  return updatedState;
};
