import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18next from 'i18next';

import logoWoloxImg from 'assets/LogoWolox.png';
import LocalStorageService from 'services/LocalStorageService';
import api from 'config/api';
import BookList from 'components/BookList';

import styles from './style.module.scss';

function Home() {
  const history = useHistory();
  const onLogoutButtonClick = () => {
    LocalStorageService.removeValue('token');
    LocalStorageService.removeValue('client');
    LocalStorageService.removeValue('uid');
    api.deleteHeader('access-token');
    api.deleteHeader('client');
    api.deleteHeader('uid');
    history.push('/');
  };

  return (
    <div>
      <nav className={`row space-around ${styles.navBar}`}>
        <Link className={styles.logo} to="/home">
          <img className={styles.logoImage} src={logoWoloxImg} alt={`${i18next.t('Home:logoAlt')}`} />
        </Link>
        <button className={styles.logOut} type="button" onClick={onLogoutButtonClick}>
          {i18next.t('Home:logout')}
        </button>
      </nav>
      <BookList />
    </div>
  );
}

export default Home;
