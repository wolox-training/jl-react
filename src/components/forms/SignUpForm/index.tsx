import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import i18next from 'i18next';

import { User } from 'utils/types';
import { emailRegex, passwordRegex } from 'constants/regex';

type SignUpFormProps = {
  onValid: SubmitHandler<User>;
};

function SignUpForm({ onValid }: SignUpFormProps) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<User>();
  const a = 'hoal';

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <span>{a}</span>
      <label htmlFor="firstName" className="form-label">
        {i18next.t('SignUp:firstName')}
      </label>
      {errors.firstName && <span className="form-alert">{errors.firstName.message}</span>}
      <input
        id="firstName"
        className="form-input"
        name="firstName"
        type="text"
        ref={register({
          required: i18next.t('FormValidations:required') as string
        })}
      />

      <label htmlFor="lastName" className="form-label">
        {i18next.t('SignUp:lastName')}
      </label>
      {errors.lastName && <span className="form-alert">{errors.lastName.message}</span>}
      <input
        id="lastName"
        className="form-input"
        name="lastName"
        type="text"
        ref={register({
          required: i18next.t('FormValidations:required') as string
        })}
      />

      <label htmlFor="email" className="form-label">
        {i18next.t('SignUp:email')}
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
        {i18next.t('SignUp:password')}
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

      <label htmlFor="passwordConfirmation" className="form-label">
        {i18next.t('SignUp:passwordConfirmation')}
      </label>
      {errors.passwordConfirmation && (
        <span className="form-alert">{errors.passwordConfirmation.message}</span>
      )}
      <input
        id="passwordConfirmation"
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

      <button className="form-submit" type="submit">
        {i18next.t('SignUp:signUpButton')}
      </button>
    </form>
  );
}

export default SignUpForm;
