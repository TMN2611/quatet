import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Link to='/'>
              <img
                src='/images/logo.png'
                alt=''
                className={styles.headerLogo}
              />
            </Link>
            <div className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/' className={styles.productLink}>
                      Giới thiệu
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/product' className={styles.productLink}>
                      Sản phẩm
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/product' className={styles.productLink}>
                      Liên hệ
                    </Link>
                  </Typography>
                </li>
              </ul>
            </div>

            <Button href='tel:0962165084' variant='contained' color='error'>
              Hotline : 0962 165 084
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
