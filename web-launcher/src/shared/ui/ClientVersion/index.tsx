import { Badge } from '@mantine/core';
import React from 'react'
import styles from "./styles.module.scss";

export const ClientVersion = () => {
  return (
      <div className={styles.wrapper}>
          <Badge children="Crafted with love" variant='gradient' />
      </div>
  )
}
