import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

export default function Home() {
  useEffect(() => {}, []);

  return (
    <Container maxWidth={'lg'}>
      <h2>Home</h2>

      <Link to='product'>HAHA</Link>
    </Container>
  );
}
