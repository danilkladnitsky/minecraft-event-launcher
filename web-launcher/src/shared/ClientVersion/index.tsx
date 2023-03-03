import { Chip } from '@mantine/core';
import React from 'react'
import styles from "./styles.module.scss";

export const ClientVersion = () => {
  return (
      <div className={styles.wrapper}>
          <Chip checked children="Версия лаунчера: v1.0.0" variant='filled' />
      </div>
  )
}
