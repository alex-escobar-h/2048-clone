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
  // Create a new board and tile map for the updated state
  const newBoard: Board = createBoard();
  const newTileMap: TileMap = {};
  let { score } = state; // For incrementing score
  let hasBoardChanged = false; // flag to determine changes

  // Setup iteration ranges based on board size
  const size = BOARD_DIMENSION;
  const outerLoop = [...Array(size).keys()];
  const innerLoop = [...Array(size).keys()];

  // Reverse direction for backward moves (down/right)
  if (direction === 'backward') innerLoop.reverse();

  // Process each row or column (depending on axis)
  for (const outer of outerLoop) {
    let cursor = direction === 'forward' ? 0 : size - 1;
    let prevTile: Tile | null = null;

    // Traverse through each tile in the line (row or column)
    for (const inner of innerLoop) {
      const [col, row] = getCoord(axis, outer, inner);
      const tileId = state.board[row][col];
      if (!tileId) continue;

      const curTile = state.tileMap[tileId];

      // Merge with the previous tile if values match
      if (prevTile && prevTile.value === curTile.value) {
        const mergedValue = prevTile.value * 2; // double value
        score += mergedValue; // add merge value to total score

        // Update the prev tile with merged value in the updated tile map
        const prevId = prevTile.id!;
        newTileMap[prevId] = {
          ...prevTile,
          value: mergedValue,
        };

        // Track the absorbed tile’s new position (for animation)
        newTileMap[tileId] = {
          ...curTile,
          position: prevTile.position,
        };

        prevTile = null;
        hasBoardChanged = true; // Mark true if merge
      } else {
        // Move current tile to the next open position
        const newPos: Position = getCoord(axis, outer, cursor);
        newBoard[newPos[1]][newPos[0]] = tileId;

        // Set the current tile's new position in the updated tile map
        newTileMap[tileId] = {
          ...curTile,
          position: newPos,
        };

        // Mark board as changed if tile moved
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

  return {
    ...state,
    board: newBoard,
    tileMap: newTileMap,
    score,
    hasBoardChanged,
  };
};
