import React, { type FC, type FormEvent, useState } from 'react';

import styles from './SignIn.module.scss';
import { Button, Checkbox, Field, Message, Modal } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, ALLOWED_OAUTH_PROVIDERS } from '../../providers';
import { AnimatePresence } from 'framer-motion';
import { getOAuthProviderIcon } from '../../utils/getOAuthProviderIcon';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { loginWithEmailAndPassword, loginWithOauthPopup, sendPasswordReset } = useAuthContext();

  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);
    loginWithEmailAndPassword(email, password, isRememberMe)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setErrorMessage('Email or Password entered incorrectly');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOAuth = async (item: string): Promise<void> => {
    setIsLoading(true);
    await loginWithOauthPopup(item, isRememberMe)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setErrorMessage('Service is not working. Try again later');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePasswordReset = async (): Promise<void> => {
    setIsLoading(true);
    await sendPasswordReset(forgotPasswordEmail)
      .then(() => {
        setSuccessMessage(`A password reset email has been sent to ${forgotPasswordEmail}`);
      })
      .catch(() => {
        setErrorMessage('Email not found. Try to register');
      })
      .finally(() => {
        setIsLoading(false);
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
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setForgotPasswordModal(true);
            }}
          >
            Forgot password
          </button>
        </div>
        <Button type="submit" disabled={isLoading} primary>
          Sign In Account
        </Button>
        <div className={styles.socials}>
          <h3>Sign in with</h3>
          <ul>
            {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  onClick={async () => {
                    await handleOAuth(item);
                  }}
                >
                  {getOAuthProviderIcon(item)}
                </Link>
              </li>
            ))}
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
        {successMessage && (
          <Message messageVisibleHandler={setSuccessMessage} success>
            {successMessage}
          </Message>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {forgotPasswordModal && (
          <Modal className={styles.modal} onShownChange={setForgotPasswordModal} shown={forgotPasswordModal}>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await handlePasswordReset();
              }}
            >
              <h3>Send password reset</h3>
              <Field
                required
                title="E-mail"
                type="email"
                value={forgotPasswordEmail}
                onChange={(event) => {
                  setForgotPasswordEmail(event.currentTarget.value);
                }}
              />
              <Button disabled={isLoading} primary>
                Send
              </Button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
