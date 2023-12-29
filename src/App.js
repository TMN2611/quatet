import React, { useEffect, useState } from 'react';
import db from './config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { Routes, Route } from 'react-router-dom';
import { Snackbar, Alert, Slide, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStore, actions } from './store';

// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import DetailProduct from './pages/DetailProduct';
import Firework from './pages/Firework';
import Carts from './pages/Carts';
import NotFound from './pages/NotFound';

// component
import Header from './components/Header';
import Footer from './components/Footer';

// colref
const productCollection = collection(db, 'Products');

function App() {
  const [state, dispatch] = useStore();
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);

  const handleClose = () => {
    setSnackBarOpen(false);
  };
  useEffect(() => {
    const ascNamequery = query(productCollection, orderBy('name'));
    const unsub = onSnapshot(ascNamequery, (snapshot) => {
      const Products = [];
      snapshot.docs.forEach((doc) => {
        Products.push({ ...doc.data(), id: doc.id, isInCarts: false });
      });

      dispatch(actions.setProducts(Products));
      const jsonData = localStorage.getItem('carts');
      const data = JSON.parse(jsonData);
      if (data) {
        dispatch(actions.setCarts(data));
      }
    });

    setSnackBarOpen(true);

    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/san-pham' element={<Products />}></Route>
        <Route path='/lien-he' element={<Contact />}></Route>
        <Route path='/phao-hoa' element={<Firework />}></Route>
        <Route path='/gio-hang' element={<Carts />}></Route>
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
