import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Products() {
  // const [currentProduct, setCurrentProduct] = useState('SP001');

  return (
    <Container maxWidth={'lg'}>
      <h2>Product</h2>
      <Link to='/san-pham/SP001'>hahah</Link>
      <Outlet />
    </Container>
  );
}
