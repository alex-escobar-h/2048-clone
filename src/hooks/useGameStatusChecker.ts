import { useEffect } from 'react';

type GameStatusCheckerProps = {
  hasChanged: boolean;
  checkGameStatus: () => void;
};
export const useGameStatusChecker = ({
  hasChanged,
  checkGameStatus,
}: GameStatusCheckerProps) => {
  useEffect(() => {
    if (!hasChanged) {
      checkGameStatus();
    }
  }, [hasChanged, checkGameStatus]);
};
