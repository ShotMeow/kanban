import React, { type FC, type FormEvent, useState } from 'react';

import styles from './SignIn.module.scss';
import { Button, Checkbox, Field } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getOAuthProviderIcon } from '../../utils/getOAuthProviderIcon';
import { useAuthContext } from '../../context';
import { ALLOWED_OAUTH_PROVIDERS } from '@/features/Authorize/provider';
import { useNotificationContext } from '@/features/Notification';
import { ForgotPasswordModal } from '@/features/Authorize/ui/ForgotPasswordModal';

interface Props {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn: FC<Props> = ({ setIsSignIn }) => {
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);

  const { setSuccess, setError } = useNotificationContext();

  const { loginWithEmailAndPassword, loginWithOauthPopup } = useAuthContext();

  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);
    loginWithEmailAndPassword(email, password, isRememberMe)
      .then(() => {
        setTimeout(() => {
          setSuccess('You have successfully logged in');
          navigate('/');
        });
      })
      .catch(() => {
        setError('Email or Password entered incorrectly');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOAuth = async (item: string): Promise<void> => {
    setIsLoading(true);
    await loginWithOauthPopup(item, isRememberMe)
      .then(() => {
        setSuccess('You have successfully logged in');
        navigate('/');
      })
      .catch(() => {
        setError('Service is not working. Try again later');
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
        {forgotPasswordModal && (
          <ForgotPasswordModal
            forgotPasswordModal={forgotPasswordModal}
            setForgotPasswordModal={setForgotPasswordModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};
