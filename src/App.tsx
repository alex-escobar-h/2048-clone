import { BoardContainer } from './components/BoardContainer';
import Footer from './components/Footer';

import { GameProvider } from './contexts/GameProvider';

export const App = () => {
  return (
    <GameProvider>
      <BoardContainer />
      <Footer />
    </GameProvider>
  );
};
