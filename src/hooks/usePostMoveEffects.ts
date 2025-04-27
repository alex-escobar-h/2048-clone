import { Dispatch, useEffect } from 'react';
import { CleanupAction } from '../types';

type PostMoveEffectsProps = {
  hasChanged: boolean;
  dispatch: Dispatch<CleanupAction>;
  addNewTile: () => void;
};

export const usePostMoveEffects = ({
  hasChanged,
  dispatch,
  addNewTile,
}: PostMoveEffectsProps) => {
  useEffect(() => {
    if (hasChanged) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'cleanup' });
        addNewTile();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [addNewTile, dispatch, hasChanged]);
};
