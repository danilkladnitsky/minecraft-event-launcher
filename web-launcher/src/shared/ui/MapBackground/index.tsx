import React from 'react'
import { useAuthStore } from 'store';
import styles from "./styles.module.scss";

function MapBackground() {
  const authenticated = useAuthStore(state => state.authenticated);

  const opacity = authenticated ? 0.3 : 0;

  return (<iframe className={styles.map} style={{ opacity }} src='https://mc.westeroscraft.com/' />)
}

export default MapBackground;