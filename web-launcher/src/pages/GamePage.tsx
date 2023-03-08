import { Button } from '@mantine/core';
import React from 'react'
import { useAuthStore, useIpcStore } from 'store';
import styles from "./GamePage.module.scss";
import UserProfile from 'shared/ui/UserProfile';

function GamePage() {
  const { logout, nickname } = useAuthStore();
  const { sendPlaySignal, playStatus, setPlayStatus, device, sendExitStatus } = useIpcStore();
  const isPlayable = device !== "browser";
  const buttonColor = !isPlaying ? { from: 'indigo', to: 'cyan' } : { from: "lime", to: "green" };
  
  const isPlaying = playStatus === "success";
  const playText = isPlayable ? `Играть за ${nickname}` : "Зайдите в лаунчер для игры";
  const closeText = isPlaying ? "Закрыть лаунчер" : "Выйти из профиля";


  const handlePlay = () => {
    if (isPlaying) {
      return;
    }
    sendPlaySignal();
  }

  const handleLogout = () => {
    sendExitStatus();
    setPlayStatus("idle");
    logout();
  }

  return ( 
    <div className={styles.wrapper}>
      <UserProfile />
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
          children={closeText}
          size="md"
          variant='gradient'
          gradient={{ from: "red" }}
          onClick={handleLogout}
          className={styles.logoutButton}
        />
      </div>
    </div>
  )
}

export default GamePage;