import { type FC, type PropsWithChildren, useState } from 'react';
import { NotificationContext } from '@/features/Notification/context';
import { AnimatePresence } from 'framer-motion';
import { Message } from '@/features/Notification/ui/Message';

export const NotificationContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <NotificationContext.Provider
      value={{
        setError,
        setSuccess,
      }}
    >
      <AnimatePresence>
        {error && (
          <Message error messageVisibleHandler={setError}>
            {error}
          </Message>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {success && (
          <Message success messageVisibleHandler={setSuccess}>
            {success}
          </Message>
        )}
      </AnimatePresence>
      {children}
    </NotificationContext.Provider>
  );
};
