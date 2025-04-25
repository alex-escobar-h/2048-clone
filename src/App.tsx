import { Board } from './components/Board';
import { Container } from './components/Container';
import { Scoreboard } from './components/Scoreboard';

export const App = () => {
  return (
    <Container>
      <Scoreboard />
      <Board />
    </Container>
  );
};
