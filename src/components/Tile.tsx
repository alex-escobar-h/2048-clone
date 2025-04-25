import styles from '../styles/Tile.module.css';
import { WIN_VALUE } from '../utils/constant';

type TileProps = {
  value: number;
};

export const Tile = ({ value }: TileProps) => {
  const colorStyles = {
    backgroundColor: `var(--${WIN_VALUE >= value ? value : 'max'}-tile)`,
    color: `var(--${WIN_VALUE >= value ? value : 'max'}-text)`,
  };
  return (
    <div
      className={styles.tile}
      style={colorStyles}
    >
      {value}
    </div>
  );
};
