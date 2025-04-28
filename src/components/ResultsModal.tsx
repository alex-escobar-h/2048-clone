import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import styles from '../styles/ResultsModal.module.css';

export const ResultsModal = () => {
  const { startGame, dispatch, status, score } = useContext(GameContext);

  const continuePlaying = () => {
    if (dispatch) {
      dispatch({ type: 'continue-playing' });
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h3 className={styles.title}>
          {status === 'won' ? 'You Won!' : 'Game Over'}
        </h3>
        <p className={styles.score}>
          Total Score: <span className={styles.scoreVal}>{score}</span>
        </p>

        <div className={styles.actions}>
          <a onClick={startGame}>Play Again?</a>
          {status === 'won' && (
            <a onClick={continuePlaying}>Continue Playing</a>
          )}
        </div>
      </div>
    </div>
  );
};
