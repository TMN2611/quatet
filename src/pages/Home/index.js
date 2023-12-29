import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

export default function Home() {
  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <h2>Home</h2>
      <section className='main'>
        <div className='container'>
          <div className='main-container'></div>
        </div>
        <div className='logo'></div>
      </section>

      <Link to='san-pham'>HAHA</Link>
    </Container>
  );
}
