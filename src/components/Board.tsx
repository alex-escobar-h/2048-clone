import { BOARD_DIMENSION } from '../utils/constant';

export const Board = () => {
  // Render 16 cells
  const renderCells = () => {
    return Array.from({ length: BOARD_DIMENSION * BOARD_DIMENSION }).map(
      (_, i) => (
        <div
          key={i}
          className='cell'
        />
      )
    );
  };

  const renderTiles = () => {
    const tempLength = 2;
    return Array.from({ length: tempLength }).map((_, i) => (
      <div
        key={i}
        className='tile'
      >
        4
      </div>
    ));
  };

  return (
    <section className='board'>
      <div className='grid'>
        {renderCells()}
        <div className='tiles'>{renderTiles()}</div>
      </div>
    </section>
  );
};
