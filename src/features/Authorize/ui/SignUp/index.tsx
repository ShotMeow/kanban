import React, { type FC, type FormEvent, useState } from 'react';
import { Button, Checkbox, Field, Message } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';

import styles from './SignUp.module.scss';
import { useAuthContext } from '@/features/Authorize';
import { AnimatePresence } from 'framer-motion';
import { ALLOWED_OAUTH_PROVIDERS } from '@/features/Authorize/providers';
import { getOAuthProviderIcon } from '@/features/Authorize/utils/getOAuthProviderIcon';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUp: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const { registerUserWithEmailAndPassword, loginWithOauthPopup } = useAuthContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password === passwordRepeat) {
      registerUserWithEmailAndPassword(email, password)
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          setErrorMessage('This email is already busy');
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
          <Link to="/">Forgot password</Link>
        </div>
        <Button primary>Create an account</Button>
        <div className={styles.socials}>
          <h3>Sign up with</h3>
          <ul>
            {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  onClick={async () => {
                    await loginWithOauthPopup(item).finally(() => {
                      navigate('/');
                    });
                  }}
                >
                  {getOAuthProviderIcon(item)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
      </AnimatePresence>
    </>
  );
};
