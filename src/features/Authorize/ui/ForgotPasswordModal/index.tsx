import React, { type FC, useState } from 'react';
import styles from '@/features/Authorize/ui/SignIn/SignIn.module.scss';
import { Button, Field, Modal } from '@/shared/ui';
import { useAuthContext } from '@/features/Authorize';
import { useNotificationContext } from '@/features/Notification';

interface Props {
  setForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  forgotPasswordModal: boolean;
}

export const ForgotPasswordModal: FC<Props> = ({ setForgotPasswordModal, forgotPasswordModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');

  const { setSuccess, setError } = useNotificationContext();
  const { sendPasswordReset } = useAuthContext();

  const handlePasswordReset = async (): Promise<void> => {
    setIsLoading(true);
    await sendPasswordReset(forgotPasswordEmail)
      .then(() => {
        setSuccess(`A password reset email has been sent to ${forgotPasswordEmail}`);
        setForgotPasswordModal(false);
      })
      .catch(() => {
        setError('Email not found.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
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
  );
};
