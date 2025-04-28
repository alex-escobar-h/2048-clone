import { Scoreboard } from './Scoreboard';
import { Board } from './Board';
import styles from '../styles/BoardContainer.module.css';

export const BoardContainer = () => {
  return (
    <main className={styles.container}>
      <Scoreboard />
      <Board />
    </main>
  );
};
