import { Board } from './components/Board';
import { Container } from './components/Container';
import { ResultsModal } from './components/ResultsModal';
import { Scoreboard } from './components/Scoreboard';
import { GameProvider } from './contexts/GameProvider';

export const App = () => {
  return (
    <GameProvider>
      <Container>
        <Scoreboard />
        <Board />
        <ResultsModal />
      </Container>
    </GameProvider>
  );
};
