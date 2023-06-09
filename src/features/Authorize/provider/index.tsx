import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  browserSessionPersistence,
  signOut,
  ProviderId,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  type UserCredential,
  type User,
} from 'firebase/auth';
import { type FirebaseApp } from 'firebase/app';

import { type TAuthContext } from '../types';
import { AuthContext } from '../context';

interface Props {
  firebaseApp: FirebaseApp;
}

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const AuthContextProvider: FC<PropsWithChildren<Props>> = ({ children, firebaseApp }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<User>();
  const [auth] = useState(getAuth(firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.useDeviceLanguage();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const sendPasswordReset = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithEmailAndPassword = async (
    email: string,
    password: string,
    rememberMe?: boolean
  ): Promise<UserCredential> => {
    void auth.setPersistence(rememberMe ? browserSessionPersistence : inMemoryPersistence);
    return await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const registerUserWithEmailAndPassword = async (
    email: string,
    password: string,
    rememberMe?: boolean
  ): Promise<void> => {
    void auth.setPersistence(rememberMe ? browserSessionPersistence : inMemoryPersistence);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithOauthPopup = async (providerId: string, rememberMe?: boolean): Promise<UserCredential> => {
    void auth.setPersistence(rememberMe ? browserSessionPersistence : inMemoryPersistence);
    setUser(undefined);
    setIsAuthenticated(null);
    return await signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[providerId])
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        logout,
        registerUserWithEmailAndPassword,
        loginWithOauthPopup,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
