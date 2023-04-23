import React, { type FC, useState } from 'react';
import { motion } from 'framer-motion';
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
        <motion.img
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
          src={kanbanImageSrc}
          width={1920}
          height={1080}
          alt="Kanban Application Preview"
        />
      </div>
    </main>
  );
};
