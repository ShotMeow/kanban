import React, { type FC, useState } from 'react';

import styles from './AuthorizePage.module.scss';

import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

import kanbanSrc from '../../images/kanban_todo_app.jpg';

export const AuthorizePage: FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <main className={styles.authorize}>
      <div className={styles.actions}>
        {isSignIn ? <SignIn setIsSignIn={setIsSignIn} /> : <SignUp setIsSignIn={setIsSignIn} />}
      </div>
      <div className={styles.landing}>
        <h1>Kanban Todo Application</h1>
        <p>Keeping a list of tasks has become even easier</p>
        <img src={kanbanSrc} alt="Kanban Application Preview" />
      </div>
    </main>
  );
};
