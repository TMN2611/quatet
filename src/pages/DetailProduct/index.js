import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
export default function DetailProduct({ id }) {
  const { productId } = useParams();
  console.log(productId);
  return (
    <Container maxWidth={'lg'}>
      <h2>DetailProduct {id}</h2>
    </Container>
  );
}
