import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18next from 'i18next';

import logoWoloxImg from 'assets/LogoWolox.png';
import LocalStorageService from 'services/LocalStorageService';

import styles from './style.module.scss';

function Home() {
  const history = useHistory();
  const onLogoutButtonClick = () => {
    LocalStorageService.removeValue('token');
    history.push('/');
  };

  return (
    <nav className={styles.navBar}>
      <Link className={styles.logo} to="/home">
        <img className={styles.logoImage} src={logoWoloxImg} alt="Wolox logo" />
      </Link>
      <button className={styles.logOut} type="button" onClick={onLogoutButtonClick}>
        {i18next.t('Home:logout')}
      </button>
    </nav>
  );
}

export default Home;