import { createContext, useContext } from 'react';

import { type NotificationContextType } from '../types';

export const NotificationContext = createContext<NotificationContextType>({
  setError: () => {},
  setSuccess: () => {},
});

export const useNotificationContext = (): NotificationContextType => {
  return useContext<NotificationContextType>(NotificationContext);
};
