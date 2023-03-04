import { Button } from '@mantine/core';
import React from 'react'
import { useAuthStore, useIpcStore } from 'store';
import styles from "./GamePage.module.scss";

function GamePage() {
    const { logout } = useAuthStore();
    const { sendPlaySignal, playStatus } = useIpcStore();

    const isPlaying = playStatus === "success";
    const playText = isPlaying ? "Игра запускается..." : "Играть";

    const buttonColor = !isPlaying ? { from: 'indigo', to: 'cyan' } : { from: "lime", to: "green" };

    const handlePlay = () => {
        if (isPlaying) {
            return;
        }

        sendPlaySignal();
    }

    return (
      <div className={styles.wrapper}>
          <div className={styles.buttons}>
              <Button
                children={playText}
                variant='gradient'
                gradient={buttonColor}
                size="md"
                className={styles.playButton}
                onClick={handlePlay}
                loading={playStatus === "loading"}
              />
              <Button
                  children="Выйти"
                  size="md"
                  variant='outline'
                  onClick={logout}
                  className={styles.logoutButton}
              />
          </div>
    </div>
  )
}

export default GamePage;