import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { Container } from '@mui/material';

import { useParams, useLocation } from 'react-router-dom';
import { useStore } from '../../store';
export default function DetailProduct() {
  const theme = useTheme();
  const { productId } = useParams();
  const { state } = useLocation();
  const { productInfor } = state;

  console.log(state);
  return (
    <Container maxWidth={'lg'}>
      <img src={productInfor.imageUrl} alt='product image' />
    </Container>
  );
}
