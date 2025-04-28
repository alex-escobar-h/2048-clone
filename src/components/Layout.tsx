import { PropsWithChildren } from 'react';
import styles from '../styles/Layout.module.css';
export const Layout = ({ children }: PropsWithChildren) => {
  return <section className={styles.layout}>{children}</section>;
};
