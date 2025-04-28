import styles from '../styles/Tile.module.css';
import { STEPS, WIN_VALUE } from '../utils/';

type TileProps = {
  value: number;
  position: [number, number];
};

export const Tile = ({ value, position }: TileProps) => {
  const [col, row] = position;
  const getPosition = (pos: number) => STEPS * pos;
  const styleValue = WIN_VALUE >= value ? value : 'max';
  const tileFontSize = styles[`tile${value}`] || styles.tileMax;

  const colorStyles = {
    backgroundColor: `var(--${styleValue}-tile)`,
    color: `var(--${styleValue}-text)`,
  };
  const animationStyles = {
    left: getPosition(col),
    top: getPosition(row),
    zIndex: value,
  };
  return (
    <div
      className={`${styles.tile} ${tileFontSize}`}
      style={{ ...colorStyles, ...animationStyles }}
    >
      {value}
    </div>
  );
};
