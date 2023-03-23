import React, { type FC, type FormEvent, useState } from 'react';
import { Button, Checkbox, Field, Message } from '@/shared/ui';

import styles from './SignUp.module.scss';
import { useAuthContext } from '@/features/Authorize';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUp: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { registerUserWithEmailAndPassword, loginWithEmailAndPassword } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password === passwordRepeat) {
      setIsLoading(true);
      registerUserWithEmailAndPassword(email, password)
        .then(() => {
          void loginWithEmailAndPassword(email, password, isRememberMe).then(() => {
            navigate('/');
          });
        })
        .catch(() => {
          setErrorMessage('This email is already busy or password is too simple');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessage("Passwords don't match");
    }
  };

  return (
    <>
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
        <Button disabled={isLoading} primary>
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
      <AnimatePresence>
        {errorMessage && (
          <Message messageVisibleHandler={setErrorMessage} error>
            {errorMessage}
          </Message>
        )}
        {successMessage && (
          <Message messageVisibleHandler={setSuccessMessage} success>
            {successMessage}
          </Message>
        )}
      </AnimatePresence>
    </>
  );
};
