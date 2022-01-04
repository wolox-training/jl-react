import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import i18next from 'i18next';

import { UserCredentials } from 'utils/types';
import { emailRegex, passwordRegex } from 'constants/regex';

type LoginFormProps = {
  onValid: SubmitHandler<UserCredentials>;
};

function LoginForm({ onValid }: LoginFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<UserCredentials>();

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <label htmlFor="email" className="form-label">
        {i18next.t('Login:email')}
      </label>
      {errors.email && <span className="form-alert">{errors.email.message}</span>}
      <input
        id="email"
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

      <label htmlFor="password" className="form-label">
        {i18next.t('Login:password')}
      </label>
      {errors.password && <span className="form-alert">{errors.password.message}</span>}
      <input
        id="password"
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

      <button className="form-submit" type="submit">
        {i18next.t('Login:loginButton')}
      </button>
    </form>
  );
}

export default LoginForm;
