import React, { useState } from 'react';
import i18next from 'i18next';
import { useMutation } from 'react-query';

import Loading from 'components/Spinner/components/loading';
import LoginForm from 'components/Forms/LoginForm';
import { UserCredentials } from 'utils/types';
import { login } from 'services/UsersService';

import styles from './styles.module.scss';

function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const { isLoading, isError, mutate } = useMutation((data: UserCredentials) => login(data), {
    onSuccess: res => {
      // eslint-disable-next-line no-console
      console.log(res);
    },
    onError: () => {
      setErrorMsg(i18next.t('FormValidations:network'));
    }
  });
  const onValid = (userCredentials: UserCredentials) => {
    mutate(userCredentials);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.logo} />
          <LoginForm onValid={onValid} />
          <div>
            <button className="button-redirect" type="button">
              {i18next.t('Login:signUpButton')}
            </button>
          </div>
          {isError && <span className="form-alert">{errorMsg}</span>}
          {isLoading && (
            <div className="row center full-width">
              <Loading name="circle" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
