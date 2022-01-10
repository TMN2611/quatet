import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Snackbar, Alert, Slide } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import DetailProduct from './pages/DetailProduct';
import NotFound from './pages/NotFound';

// component
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  const [isSnackBarOpen, setSnackBarOpen] = useState(true);
  const handleClose = () => {
    setSnackBarOpen(false);
  };
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product' element={<Products />}>
          <Route path='1' element={<DetailProduct />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

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

      <Footer />
    </>
  );
}

export default App;
