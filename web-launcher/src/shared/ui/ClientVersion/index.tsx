import { Badge } from '@mantine/core';
import React from 'react'
import styles from "./styles.module.scss";

export const ClientVersion = () => {
  return (
      <div className={styles.wrapper}>
          <Badge children="Версия лаунчера: v0.1" variant='dot' />
      </div>
  )
}
