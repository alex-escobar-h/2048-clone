import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import styles from '../styles/Scoreboard.module.css';
export const Scoreboard = () => {
  const { score } = useContext(GameContext);

  return (
    <section className={styles.container}>
      <div className={styles.logo}>2048</div>
      <div className={styles.scoreContainer}>
        <h2 className={styles.scoreTitle}>SCORE</h2>
        <span className={styles.score}>{score}</span>
      </div>
    </section>
  );
};
