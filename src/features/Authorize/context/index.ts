import { createContext, useContext } from 'react';

import { type TAuthContext } from '../types';

export const AuthContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: async () => await Promise.reject({}),
  registerUserWithEmailAndPassword: async () => {
    await Promise.reject({});
  },
  loginWithOauthPopup: async () => await Promise.reject({}),
  sendPasswordReset: async () => {
    await Promise.reject({});
  },
  logout: () => void 0,
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(AuthContext);
};
