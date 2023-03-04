import { Button } from '@mantine/core';
import React from 'react'
import styles from "./GamePage.module.scss";

function GamePage() {
  return (
      <div className={styles.wrapper}>
          <Button
              children="Играть"
              variant='gradient'
              gradient={{ from: 'indigo', to: 'cyan' }}
          />
    </div>
  )
}

export default GamePage;