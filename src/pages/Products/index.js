import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useStore } from '../../store';
import {
  Container,
  CardActionArea,
  CardMedia,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Products.module.css';

export default function Products() {
  const navigate = useNavigate();
  const [state, dispatch] = useStore();
  const { products } = state;

  useEffect(() => {}, []);
  return (
    <Container maxWidth={'lg'}>
      <h2>Product</h2>

      <Grid container spacing={2}>
        {products.map((product, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    navigate(`/san-pham/${product.name}`, {
                      state: { productInfor: product },
                    });
                  }}
                >
                  <CardMedia
                    component='img'
                    height='200'
                    image={`${product.imageUrl}`}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'black',
                        }}
                        className={styles.productName}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                        sx={{ color: '#f85757' }}
                        className={styles.productPrice}
                      >
                        {product.price
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}
                        VNĐ
                      </Typography>
                    </Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      className={styles.productDescription}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  {/* <IconButton color='primary' aria-label='add to shopping cart'>
                
              </IconButton> */}

                  <Tooltip title='Thêm vào giỏ hàng'>
                    <IconButton>
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Outlet />
    </Container>
  );
}
