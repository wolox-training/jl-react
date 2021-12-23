import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import i18next from 'i18next';
import { useMutation } from 'react-query';

import { User } from 'utils/types';
import { emailRegex, passwordRegex } from 'constants/regex';
import { signUp } from 'services/UsersService';
import Loading from 'components/Spinner/components/loading';

function SignUpForm() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<User>();
  const [errorMsg, setErrorMsg] = useState('');
  const { isLoading, isError, mutate } = useMutation((data: User) => signUp(data), {
    // eslint-disable-next-line no-console
    onSuccess: res => console.log('res', res),
    onError: () => {
      setErrorMsg(i18next.t('FormValidations:network'));
    }
  });
  const onSubmit = () => mutate(getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="form-label">{i18next.t('SignUp:firstName')}</label>
      {errors.firstName && <span className="form-alert">{errors.firstName.message}</span>}
      <input
        className="form-input"
        name="firstName"
        type="text"
        ref={register({
          required: i18next.t('FormValidations:required') as string
        })}
      />

      <label className="form-label">{i18next.t('SignUp:lastName')}</label>
      {errors.lastName && <span className="form-alert">{errors.lastName.message}</span>}
      <input
        className="form-input"
        name="lastName"
        type="text"
        ref={register({
          required: i18next.t('FormValidations:required') as string
        })}
      />

      <label className="form-label">{i18next.t('SignUp:email')}</label>
      {errors.email && <span className="form-alert">{errors.email.message}</span>}
      <input
        className="form-input"
        name="email"
        type="text"
        ref={register({
          required: i18next.t('FormValidations:required') as string,
          pattern: {
            value: emailRegex,
            message: i18next.t('FormValidations:email') as string
          }
        })}
      />

      <label className="form-label">{i18next.t('SignUp:password')}</label>
      {errors.password && <span className="form-alert">{errors.password.message}</span>}
      <input
        className="form-input"
        name="password"
        type="password"
        ref={register({
          required: i18next.t('FormValidations:required') as string,
          pattern: {
            value: passwordRegex,
            message: i18next.t('FormValidations:password') as string
          }
        })}
      />

      <label className="form-label">{i18next.t('SignUp:passwordConfirmation')}</label>
      {errors.passwordConfirmation && (
        <span className="form-alert">{errors.passwordConfirmation.message}</span>
      )}
      <input
        className="form-input"
        name="passwordConfirmation"
        type="password"
        ref={register({
          required: i18next.t('FormValidations:required') as string,
          validate: {
            match: v =>
              v === getValues().password || (i18next.t('FormValidations:passwordConfirmation') as string)
          }
        })}
      />

      {isError && <span className="form-alert">{errorMsg}</span>}

      {isLoading && (
        <div className="row center full-width">
          <Loading name="circle" />
        </div>
      )}

      <button className="form-submit" type="submit">
        {i18next.t('SignUp:signUpButton')}
      </button>
    </form>
  );
}

export default SignUpForm;
