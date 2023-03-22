import React, { createContext, type FC, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
  ProviderId,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  type UserCredential,
} from 'firebase/auth';
import { type TAuthContext } from '../types';
import { type FirebaseApp } from 'firebase/app';

interface TProps {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
}

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
  [ProviderId.FACEBOOK]: new FacebookAuthProvider(),
  [ProviderId.TWITTER]: new TwitterAuthProvider(),
};

export const AuthContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: async () => await Promise.reject({}),
  registerUserWithEmailAndPassword: async () => await Promise.reject({}),
  loginWithOauthPopup: async () => await Promise.reject({}),
  logout: () => void 0,
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(AuthContext);
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    void auth.setPersistence(browserSessionPersistence);
    auth.useDeviceLanguage();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const registerUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithOauthPopup = async (providerId: string): Promise<UserCredential> => {
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
