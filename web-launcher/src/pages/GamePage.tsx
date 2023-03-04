import { Button } from '@mantine/core';
import React from 'react'
import { useAuthStore, useIpcStore } from 'store';
import styles from "./GamePage.module.scss";

function GamePage() {
    const { logout } = useAuthStore();
    const { sendPlaySignal, playStatus, setPlayStatus, device } = useIpcStore();

    const isPlaying = playStatus === "success";

    const buttonColor = !isPlaying ? { from: 'indigo', to: 'cyan' } : { from: "lime", to: "green" };

    const isPlayable = device !== "browser";

    const playText = isPlayable ?  isPlaying ? "Игра запускается..." : "Играть" : "Зайдите в лаунчер для игры";


    const handlePlay = () => {
        if (isPlaying) {
            return;
        }
        sendPlaySignal();
    }

    const handleLogout = () => {
        logout();
        setPlayStatus("idle");
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
                disabled={!isPlayable}
              />
              <Button
                  children="Выйти"
                  size="md"
                    variant='gradient'
                    gradient={{from: "red"}}
                  onClick={handleLogout}
                  className={styles.logoutButton}
              />
          </div>
    </div>
  )
}

export default GamePage;