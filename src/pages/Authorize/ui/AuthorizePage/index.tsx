import React, { type FC, useState } from 'react';

import { SignIn, SignUp } from '@/features/Authorize';

import kanbanImageSrc from '@/shared/images/kanban_todo_app.jpg';

import styles from './AuthorizePage.module.scss';

export const AuthorizePage: FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  return (
    <main className={styles.authorize}>
      <div className={styles.actions}>
        {isSignIn ? <SignIn setIsSignIn={setIsSignIn} /> : <SignUp setIsSignIn={setIsSignIn} />}
      </div>
      <div className={styles.landing}>
        <div className={styles.heading}>
          <h1>Kanban Todo Application</h1>
          <p>Keeping a list of tasks has become even easier</p>
        </div>
        <img src={kanbanImageSrc} alt="Kanban Application Preview" />
      </div>
    </main>
  );
};
