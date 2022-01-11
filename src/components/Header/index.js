import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Badge, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
console.log(styles);
export default function ButtonAppBar() {
  let navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { name: 'GIỚI THIỆU', icon: HomeIcon, path: '/' },
          { name: 'SẢN PHẨM', icon: CardGiftcardIcon, path: '/san-pham' },
          { name: 'LIÊN HỆ', icon: ContactPhoneIcon, path: '/lien-he' },
        ].map((item, index) => (
          <ListItem
            button
            key={item.name}
            onClick={() => {
              navigate(`${item.path}`);
            }}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <div className={styles.navToggleBtn}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={toggleDrawer('left', true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
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
                    <Link to='/san-pham' className={styles.productLink}>
                      Sản phẩm
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/lien-he' className={styles.productLink}>
                      Liên hệ
                    </Link>
                  </Typography>
                </li>
              </ul>
            </div>
            <div className={styles.headerCart}>
              <Badge badgeContent={4} color='error'>
                <AddShoppingCartIcon color='action' />
              </Badge>
            </div>
            <Button
              href='tel:0962165084'
              variant='contained'
              color='error'
              className={styles.headerHotlineBtn}
            >
              Hotline
            </Button>
          </Toolbar>
          <div>
            <React.Fragment key={'left'}>
              <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
              >
                {list('left')}
              </Drawer>
            </React.Fragment>
          </div>
        </Container>
      </AppBar>
    </Box>
  );
}
