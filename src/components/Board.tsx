import { BOARD_DIMENSION } from '../utils/';
import styles from '../styles/Board.module.css';
import { Tile } from './Tile';
import { useContext } from 'react';

import { GameContext } from '../contexts/GameContext';

export const Board = () => {
  const { getTiles } = useContext(GameContext);
  // Render 16 cells
  const renderCells = () => {
    return Array.from({ length: BOARD_DIMENSION * BOARD_DIMENSION }).map(
      (_, i) => (
        <div
          key={i}
          className={styles.cell}
        />
      )
    );
  };
  const renderTiles = () => {
    return getTiles().map((tile) => (
      <Tile
        key={tile.id}
        {...tile}
      />
    ));
  };

  return (
    <section className={styles.board}>
      <div className={styles.grid}>
        {renderCells()}
        <div className={styles.tiles}>{renderTiles()}</div>
      </div>
    </section>
  );
};
