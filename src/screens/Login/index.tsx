import React, { useState } from 'react';
import i18next from 'i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import Loading from 'components/Spinner/components/loading';
import LoginForm from 'components/Forms/LoginForm';
import { UserCredentials } from 'utils/types';
import { login } from 'services/UsersService';

import styles from './styles.module.scss';

function Login() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const { isLoading, isError, mutate } = useMutation((data: UserCredentials) => login(data), {
    onSuccess: res => {
      // eslint-disable-next-line no-console
      console.log('access-token: ', res);
      history.push('/home');
    },
    onError: () => {
      setErrorMsg(i18next.t('FormValidations:credentials'));
    }
  });
  const onValid = (userCredentials: UserCredentials) => {
    mutate(userCredentials);
  };
  const onSignUpButtonClick = () => {
    history.push('/sign_up');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.logo} />
          <LoginForm onValid={onValid} />
          <div>
            <button className="button-redirect" type="button" onClick={onSignUpButtonClick}>
              {i18next.t('Login:signUpButton')}
            </button>
          </div>
          {isError && <span className="form-alert row center">{errorMsg}</span>}
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
