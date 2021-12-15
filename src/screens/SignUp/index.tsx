import React from 'react';
import i18next from 'i18next';

import SignUpForm from '../../components/forms/SignUpForm';

import styles from './styles.module.scss';

function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.logo} />
          <SignUpForm />
          <div>
            <button className="button__redirect" type="button">
              {i18next.t('SignUp:loginButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
