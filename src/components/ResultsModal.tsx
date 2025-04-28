import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import styles from '../styles/ResultsModal.module.css';

export const ResultsModal = () => {
  const { startGame, updateStatus, status, score } = useContext(GameContext);

  const continuePlaying = () => {
    if (updateStatus) {
      updateStatus('continue-playing');
    }
  };

  return (
    <div className={styles.container}>
      <h3>{status === 'won' ? 'You Won!' : 'Game Over'}</h3>
      {status === 'lost' && <p>Total score: {score}</p>}

      <div className={styles.actions}>
        <button onClick={startGame}>Play Again?</button>
        {status === 'won' && (
          <button onClick={continuePlaying}>Continue Playing</button>
        )}
      </div>
    </div>
  );
};
