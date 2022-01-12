import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
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
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Container, Grid } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const mobileNavClass = ClassNames({
  [styles.headerLogo]: true,
  [styles.hiddenOnMobile]: true,
});

const mobileHolineClass = ClassNames({
  [styles.headerHotlineBtn]: true,
  [styles.hiddenOnMobile]: true,
});

export default function ButtonAppBar() {
  let navigate = useNavigate();
  const params = useLocation();

  const [isFireWorkPage, setIsFireWorkPage] = useState(() => {
    if (params.pathname === '/phao-hoa') return true;
    else return false;
  });

  const navCartClass = ClassNames({
    [styles.headerCart]: true,
    [styles.hiddenOnMobile]: true,
  });

  useEffect(() => {
    if (params.pathname === '/phao-hoa') return setIsFireWorkPage(true);
    else return setIsFireWorkPage(false);
  });

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
      <Link to='/'>
        <img src='/images/logo.png' alt='' className={styles.headerLogo} />
      </Link>

      <List>
        {[
          { name: 'GIỚI THIỆU', icon: HomeIcon, path: '/' },
          { name: 'SẢN PHẨM', icon: CardGiftcardIcon, path: '/san-pham' },
          { name: 'LIÊN HỆ', icon: ContactPhoneIcon, path: '/lien-he' },
          {
            name: 'PHÁO HOA',
            icon: LocalFireDepartmentOutlinedIcon,
            path: '/phao-hoa',
          },
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
    <Box sx={{ flexGrow: 1, zIndex: 2 }}>
      <AppBar position='static' color='transparent'>
        <Container maxWidth='lg' className={styles.header}>
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
              <img src='/images/logo.png' alt='' className={mobileNavClass} />
            </Link>
            <div className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link
                      to='/'
                      className={styles.productLink}
                      style={{ color: isFireWorkPage ? 'white' : 'black' }}
                    >
                      Giới thiệu
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link
                      to='/san-pham'
                      className={styles.productLink}
                      style={{ color: isFireWorkPage ? 'white' : 'black' }}
                    >
                      Sản phẩm
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link
                      to='/lien-he'
                      className={styles.productLink}
                      style={{ color: isFireWorkPage ? 'white' : 'black' }}
                    >
                      Liên hệ
                    </Link>
                  </Typography>
                </li>
                <li className={styles.navItem}>
                  <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link
                      to='/phao-hoa'
                      className={styles.productLink}
                      style={{ color: isFireWorkPage ? 'white' : 'black' }}
                    >
                      Xem pháo hoa
                    </Link>
                  </Typography>
                </li>
              </ul>
            </div>

            <div className={navCartClass}>
              <Badge badgeContent={4} color='error'>
                <AddShoppingCartIcon
                  color='action'
                  style={{ color: isFireWorkPage ? 'white' : 'black' }}
                />
              </Badge>
            </div>
            <Button
              href='tel:0962165084'
              variant='contained'
              color='error'
              className={mobileHolineClass}
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
