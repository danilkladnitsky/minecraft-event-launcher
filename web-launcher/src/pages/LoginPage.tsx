import { Button, TextInput } from '@mantine/core';
import { IconLogin } from "@tabler/icons-react";
import React, { ChangeEvent, useState } from 'react'
import { Alert } from 'shared/Alert';
import { ClientVersion } from 'shared/ClientVersion';
import { useAuthStore } from 'store';

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const { authenticate, isLoading, error, clearError } = useAuthStore();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authenticate(nickname, password);
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <TextInput error={error} onChange={handleNicknameChange} label="Логин" placeholder='Lololoshka' value={nickname} required />
      <TextInput onChange={handlePasswordChange} label="Пароль" placeholder='********' type={"password"} required />
      <Button
        loading={isLoading}
        className={styles.loginBtn}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        leftIcon={<IconLogin size={"1rem"} />}
        onClick={handleLogin}
        >
        Авторизоваться
      </Button>
      <ClientVersion />
    </div>
  )
}

export default LoginPage;