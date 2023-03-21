import React, { type FC, type FormEvent, useState } from 'react';

import styles from './SignIn.module.scss';
import { AppleIcon, Button, Checkbox, Field, GithubIcon, GoogleIcon, Message } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/features/Authorize';
import { AnimatePresence } from 'framer-motion';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { loginWithEmailAndPassword } = useAuthContext();

  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    loginWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setErrorMessage('Email or Password entered incorrectly');
      });
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
          <p>Sign in your account</p>
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
        </div>
        <div className={styles.actions}>
          <Checkbox isActive={isRememberMe} setIsActive={setIsRememberMe} title="Remember me" />
          <Link to="/">Forgot password</Link>
        </div>
        <Button primary>Sign In Account</Button>
        <div className={styles.socials}>
          <h3>Sign in with</h3>
          <ul>
            <li>
              <button type="button">
                <GithubIcon />
              </button>
            </li>
            <li>
              <button type="button">
                <AppleIcon />
              </button>
            </li>
            <li>
              <button type="button">
                <GoogleIcon />
              </button>
            </li>
          </ul>
        </div>
        <p className={styles.state}>
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignIn(false);
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
      <AnimatePresence>
        {errorMessage && (
          <Message messageVisibleHandler={setErrorMessage} error>
            {errorMessage}
          </Message>
        )}
      </AnimatePresence>
    </>
  );
};
