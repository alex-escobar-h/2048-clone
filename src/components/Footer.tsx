import styles from '../styles/Footer.module.css';
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p>
          By <span className={styles.author}>Alex Escobar</span>
        </p>
        <div className={styles.socials}>
          <a
            className={styles.social}
            href='https://github.com/alex-escobar-h'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
          <a
            className={styles.social}
            href='https://www.linkedin.com/in/alex-h-escobar'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
