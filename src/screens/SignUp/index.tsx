import React, { useState } from 'react';
import i18next from 'i18next';
import { useMutation } from 'react-query';

import SignUpForm from 'components/forms/SignUpForm';
import { User } from 'utils/types';
import { signUp } from 'services/UsersService';
import Loading from 'components/Spinner/components/loading';

import styles from './styles.module.scss';

function SignUp() {
  const [errorMsg, setErrorMsg] = useState('');
  const { isLoading, isError, mutate } = useMutation((data: User) => signUp(data), {
    onSuccess: res => {
      // eslint-disable-next-line no-console
      console.log('res', res);
    },
    onError: () => {
      setErrorMsg(i18next.t('FormValidations:network'));
    }
  });
  const onValid = (user: User) => {
    mutate(user);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.logo} />
          <SignUpForm onValid={onValid} />
          <div>
            <button className="button-redirect" type="button">
              {i18next.t('SignUp:loginButton')}
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

export default SignUp;
