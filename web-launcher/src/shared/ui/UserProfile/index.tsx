import React from 'react'

import { Button, Tooltip } from '@mantine/core';
import { useSnackbar } from 'notistack';

import { useAuthStore } from 'store';

import styles from "./styles.module.scss";


function UserProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const authenticated = useAuthStore(state => state.authenticated);
  const { nickname } = useAuthStore();

  const handleOpenProfile = () => {
    enqueueSnackbar("Редактирование профиля пока недоступно", { variant: "info" });
  }

  return authenticated && <div className={styles.bg}>
    <div className={styles.actions}>
      <Tooltip label="Настройка оперативной памяти, смена скина">
        <Button variant="subtle" onClick={handleOpenProfile}>Профиль игрока {nickname}</Button>
      </Tooltip>
    </div>
    <img className={styles.loading} src='/loading.gif' />
  </div>
}

export default UserProfile;