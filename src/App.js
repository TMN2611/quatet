import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import { Routes, Route } from 'react-router-dom';
import { Snackbar, Alert, Slide } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import DetailProduct from './pages/DetailProduct';
import Firework from './pages/Firework';
import NotFound from './pages/NotFound';

// component
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);

  const handleClose = () => {
    setSnackBarOpen(false);
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection('Products')
      .get()
      .then(products => {
        products.forEach(product => {
          console.log(product.data());
        });
      });
    setSnackBarOpen(true);
  }, []);
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/san-pham' element={<Products />}></Route>
        <Route path='/lien-he' element={<Contact />}></Route>
        <Route path='/phao-hoa' element={<Firework />}></Route>
        <Route path='*' element={<NotFound />} />
        <Route
          path={'/san-pham/:productId'}
          element={<DetailProduct />}
        ></Route>
      </Routes>

      {isSnackBarOpen ? (
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          onClose={handleClose}
        >
          <Alert
            icon={<FavoriteIcon />}
            onClose={handleClose}
            variant='filled'
            severity='error'
            sx={{ width: '100%' }}
          >
            Chào mừng bạn đến với ZOLO
          </Alert>
        </Snackbar>
      ) : null}

      <Footer />
    </>
  );
}

export default App;
