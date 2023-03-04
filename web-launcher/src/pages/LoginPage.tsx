import { Button, TextInput } from '@mantine/core';
import { IconLogin } from "@tabler/icons-react";
import React, { ChangeEvent, useState } from 'react'
import { ClientVersion } from 'shared/ui/ClientVersion';
import { useAuthStore } from 'store';

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const { authenticate, loginInProcess: isLoading, error, clearError } = useAuthStore();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const formDisabled = !nickname.length || !password.length;

  const handleLogin = () => {
    authenticate(nickname, password);
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearError();
    setNickname(e.target.value);
  }
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearError();
    setPassword(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <TextInput
        disabled={isLoading}
        error={error}
        onChange={handleNicknameChange}
        label="Логин"
        placeholder='Lololoshka'
        value={nickname}
        required={!nickname.length}
      />
      <TextInput
        disabled={isLoading}
        onChange={handlePasswordChange}
        label="Пароль"
        placeholder='********'
        type={"password"}
        required={!password.length}
      />
      <Button
        loading={isLoading}
        className={styles.loginBtn}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        leftIcon={<IconLogin size={"1rem"} />}
        onClick={handleLogin}
        disabled={formDisabled}
        size="md"
        >
        Авторизоваться
      </Button>
      <ClientVersion />
    </div>
  )
}

export default LoginPage;