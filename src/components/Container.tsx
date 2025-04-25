import { PropsWithChildren } from 'react';
import styles from '../styles/Container.module.css';

export const Container = ({ children }: PropsWithChildren) => {
  return <main className={styles.container}>{children}</main>;
};
