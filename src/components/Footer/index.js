import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import Particles from '../Particle';
import styles from './Footer.module.css';
export default function Footer() {
  useEffect(() => {});
  return (
    <div style={{ background: 'black', overflow: 'hidden' }}>
      <Particles className={styles.particles}>
        <Container maxWidth={'lg'}></Container>
      </Particles>
    </div>
  );
}
