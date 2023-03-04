import { Chip } from '@mantine/core'
import React from 'react'

import styles from "./styles.module.scss";

export const ServerStatus = () => {
  return (
    <Chip checked className={styles.status}>Сервер доступен</Chip>
  )
}
