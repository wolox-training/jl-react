import React, { useState } from 'react';
import i18next from 'i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import Loading from 'components/Spinner/components/loading';
import LoginForm from 'components/Forms/LoginForm';
import { UserCredentials } from 'utils/types';
import { login } from 'services/UsersService';
import LocalStorageService from 'services/LocalStorageService';

import styles from './styles.module.scss';

function Login() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const { isLoading, isError, mutate } = useMutation((data: UserCredentials) => login(data), {
    onSuccess: res => {
      LocalStorageService.setValue('token', res.headers && res.headers['access-token']);
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
    <div className="container">
      <div className="wrapper">
        <div className="card card-small">
          <div className={`row center ${styles.logo}`} />
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
