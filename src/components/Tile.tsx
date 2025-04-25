import styles from '../styles/Tile.module.css';
import { STEPS, WIN_VALUE } from '../utils/';

type TileProps = {
  value: number;
  position: [number, number];
};

export const Tile = ({ value, position }: TileProps) => {
  const [col, row] = position;
  const getPosition = (pos: number) => STEPS * pos;

  const colorStyles = {
    backgroundColor: `var(--${WIN_VALUE >= value ? value : 'max'}-tile)`,
    color: `var(--${WIN_VALUE >= value ? value : 'max'}-text)`,
  };
  const animationStyles = {
    left: getPosition(col),
    top: getPosition(row),
    zIndex: value,
  };
  return (
    <div
      className={styles.tile}
      style={{ ...colorStyles, ...animationStyles }}
    >
      {value}
    </div>
  );
};
