import { BoardContainer } from './components/BoardContainer';
import Footer from './components/Footer';
import { Layout } from './components/Layout';

import { GameProvider } from './contexts/GameProvider';

export const App = () => {
  return (
    <GameProvider>
      <Layout>
        <BoardContainer />
        <Footer />
      </Layout>
    </GameProvider>
  );
};
