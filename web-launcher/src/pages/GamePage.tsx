import { Button } from '@mantine/core';
import React from 'react'
import { useAuthStore } from 'store';
import styles from "./GamePage.module.scss";

function GamePage() {
    const { nickname, logout } = useAuthStore();
  return (
      <div className={styles.wrapper}>
          <div className={styles.buttons}>
              <Button
                children={`Играть за ${nickname}`}
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan' }}
                size="md"
                className={styles.playButton}
              />
              <Button
                  children="Выйти"
                  size="md"
                  variant='outline'
                  onClick={logout}
              />
          </div>
    </div>
  )
}

export default GamePage;