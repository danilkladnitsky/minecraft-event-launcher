import React from 'react'
import { useAuthStore } from 'store';
import styles from "./styles.module.scss";

function MapBackground() {
  const authenticated = useAuthStore(state => state.authenticated);

  return authenticated && <div className={styles.bg}>
    <img className={styles.loading} src='/loading.gif' />
  </div>
}

export default MapBackground;