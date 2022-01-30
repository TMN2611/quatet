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
import ClearIcon from '@mui/icons-material/Clear';
import { Container } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { useStore, actions } from '../../store';

const mobileNavLogoClass = ClassNames({
  [styles.headerLogo]: true,
  [styles.hiddenOnMobileAndTablet]: true,
});

const mobileHolineClass = ClassNames({
  [styles.headerHotlineBtn]: true,
  [styles.hiddenOnMobile]: true,
});

export default function ButtonAppBar() {
  let navigate = useNavigate();
  const [state, dispatch] = useStore();

  const { products, carts } = state;
  kw;

  const numberPrductInCarts = carts.length;

  const params = useLocation();

  const [isFireWorkPage, setIsFireWorkPage] = useState(() => {
    if (params.pathname === '/phao-hoa') return true;
    else return false;
  });

  const navCartClass = ClassNames({
    [styles.headerCart]: true,
    [styles.hiddenOnMobile]: isFireWorkPage,
  });

  useEffect(() => {
    if (params.pathname === '/phao-hoa') return setIsFireWorkPage(true);
    else return setIsFireWorkPage(false);
  }, [params.pathname]);

  const [states, setState] = React.useState({
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

    setState({ ...states, [anchor]: open });
  };

  const listNav = anchor => (
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

  const listCarts = anchor => (
    <Box
      sx={{
        width: 300,
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {carts.map((item, index) => (
          <ListItem
            button
            key={item.name}
            onClick={() => {
              navigate('/gio-hang');
            }}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${item.imageUrl}`}
                alt=''
                style={{
                  width: 50,
                  height: 50,
                  objectFit: 'cover',
                  borderRadius: 25,
                  marginRight: 20,
                }}
              />
              <Box>
                <ListItemText primary={item.name} />
                <ListItemText
                  primary={`${item.price
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} đ`}
                  sx={{ color: 'red', fontWeight: 'bold' }}
                />
              </Box>
            </Box>
            <Box>
              <IconButton
                aria-label='delete'
                size='middle'
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(actions.deleteFromCarts(item));
                }}
              >
                <ClearIcon fontSize='inherit' />
              </IconButton>
            </Box>
          </ListItem>
        ))}
        <h2>Xem giỏ hàng</h2>
      </List>
      <Divider />
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1, zIndex: 2, marginBottom: 5 }}>
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
              <img
                src='/images/logo.png'
                alt=''
                className={mobileNavLogoClass}
              />
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
              <Badge
                badgeContent={carts.length}
                color='error'
                onClick={toggleDrawer('right', true)}
              >
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
          {/* Nav mobile */}
          <div>
            <React.Fragment key={'left'}>
              <Drawer
                anchor={'left'}
                open={states['left']}
                onClose={toggleDrawer('left', false)}
              >
                {listNav('left')}
              </Drawer>
            </React.Fragment>
          </div>
          {/* list Carts */}
          <div>
            <React.Fragment key={'right'}>
              <Drawer
                anchor={'right'}
                open={states['right']}
                onClose={toggleDrawer('right', false)}
              >
                {listCarts('right')}
              </Drawer>
            </React.Fragment>
          </div>
        </Container>
      </AppBar>
    </Box>
  );
}
