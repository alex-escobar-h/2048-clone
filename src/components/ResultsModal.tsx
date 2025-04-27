import { GameContext } from '../contexts/GameContext';
import { useContext } from 'react';
import styles from '../styles/ResultsModal.module.css';

export const ResultsModal = () => {
  const { startGame, updateStatus, status, score } = useContext(GameContext);
  const title = { won: 'You Won!', lost: 'Game Over', playing: '' } as const;
  if (status === 'playing') return null;

  const isWon = status === 'won';
  const isLost = status === 'lost';

  const resetGame = () => {
    if (updateStatus) {
      updateStatus('playing');
    }
    console.log(status, '!!!!!!');
  };

  return (
    <div className={styles.container}>
      <h3>{isWon ? title.won : title.lost}</h3>

      {isLost && <p>Total score: {score}</p>}

      <div className={styles.actions}>
        <button
          onClick={() => {
            console.log('Start Game btn');
            startGame();
          }}
        >
          Play Again?
        </button>
        {isWon && <button onClick={resetGame}>Continue Playing</button>}
      </div>
    </div>
  );
};
