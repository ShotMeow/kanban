import { type FC, type PropsWithChildren, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { NotificationContext } from '../context';
import { Message } from '../ui/Message';

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
