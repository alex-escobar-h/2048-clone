import { BOARD_DIMENSION } from '../utils/constant';
import styles from '../styles/Board.module.css';
import { Tile } from './Tile';
export const Board = () => {
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
    const tempLength = 2;
    return Array.from({ length: tempLength }).map((_, i) => (
      <Tile
        key={i}
        value={4}
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
