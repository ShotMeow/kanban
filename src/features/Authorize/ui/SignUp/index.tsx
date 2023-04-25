import React, { type FC, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context';

import { useNotificationContext } from '@/features/Notification';
import { Button, Checkbox, Field } from '@/shared/ui';

import styles from './SignUp.module.scss';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUp: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { registerUserWithEmailAndPassword, loginWithEmailAndPassword } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  const { setSuccess, setError } = useNotificationContext();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (password === passwordRepeat) {
      setIsLoading(true);
      registerUserWithEmailAndPassword(email, password)
        .then(() => {
          void loginWithEmailAndPassword(email, password, isRememberMe).then(() => {
            setSuccess('You have successfully register and logged in');
            navigate('/');
          });
        })
        .catch(() => {
          setError('This email is already busy or password is too simple');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      className={styles.form}
    >
      <div className={styles.heading}>
        <h2>Welcome to Kanban System</h2>
        <p>Create your account</p>
      </div>
      <div className={styles.fields}>
        <Field
          required
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
          title="E-mail"
          type="email"
        />
        <Field
          required
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          title="Password"
          type="password"
        />
        <Field
          required
          value={passwordRepeat}
          onChange={(event) => {
            setPasswordRepeat(event.currentTarget.value);
          }}
          title="Repeat password"
          type="password"
        />
      </div>
      <div className={styles.actions}>
        <Checkbox isActive={isRememberMe} setIsActive={setIsRememberMe} title="Remember me" />
      </div>
      <Button type="submit" disabled={isLoading} primary>
        Create an account
      </Button>
      <p className={styles.state}>
        Have an account?{' '}
        <button
          type="button"
          onClick={() => {
            setIsSignIn(true);
          }}
        >
          Sign In
        </button>
      </p>
    </form>
  );
};
