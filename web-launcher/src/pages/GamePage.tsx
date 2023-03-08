import { Button, CloseButton, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useAuthStore, useIpcStore } from 'store';
import styles from "./GamePage.module.scss";
import UserProfile from 'shared/ui/UserProfile';

function GamePage() {
  const { logout, nickname } = useAuthStore();
  const { sendPlaySignal, playStatus, setPlayStatus, device, sendExitStatus, stopGame } = useIpcStore();
  const isPlayable = device !== "browser";
  const buttonColor = !isPlaying ? { from: 'indigo', to: 'cyan' } : { from: "lime", to: "green" };
  
  const isPlaying = playStatus === "success";
  const playText = !isPlaying ? `Играть за ${nickname}` : "Игра запущена";
  const closeText = isPlaying ? "Закрыть игру" : "Закрыть лаунчер";

  const [canCloseGame, setCanCloseGame] = useState(false);
  const [loadingCloseGame, setLoadingCloseGame] = useState(false);

  useEffect(() => {
    if (playStatus !== "success") return;
    setLoadingCloseGame(true);
    const id = setTimeout(() => {
      setCanCloseGame(true);
      setLoadingCloseGame(false);
    }, 5000);
    
    return () => {
      clearTimeout(id);
      setCanCloseGame(false);
    };
  }, [playStatus])
  

  const handlePlay = () => {
    if (isPlaying) {
      return;
    }
    sendPlaySignal();
  }

  const handleExit = () => {
    sendExitStatus();
    setPlayStatus("idle");
  }

  const handleGameStop = () => {
    stopGame();
  }

  const handleLogout = () => {
    logout();
    setPlayStatus("idle");
    stopGame();
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
          loading={playStatus === "loading" || isPlaying}
          disabled={!isPlayable || isPlaying}
        />
        <Button
          children={closeText}
          size="md"
          variant='gradient'
          gradient={{ from: "red" }}
          onClick={isPlaying ? handleGameStop : handleExit}
          className={styles.logoutButton}
          disabled={isPlaying && !canCloseGame}
          loading={loadingCloseGame}
        />
        <Tooltip label="Выйти из аккаунта">
            <CloseButton className={styles.logout} variant="light" disabled={isPlaying} onClick={handleLogout} />
        </Tooltip>
      </div>
    </div>
  )
}

export default GamePage;