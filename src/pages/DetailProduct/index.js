import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import db from '../../config/firebase';
import styles from './DetailProduct.module.css';
import { doc, getDoc } from 'firebase/firestore';
import {
  Container,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useStore, actions } from '../../store';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Slider from 'react-slick';
import { deepOrange, deepPurple } from '@mui/material/colors';
const useStyles = makeStyles({
  container: {
    paddingTop: 30,
    marginTop: 20,
  },
  image: {
    width: '100%',
  },
});

export default function DetailProduct() {
  const classes = useStyles();
  const { productId } = useParams();
  const [productInfor, setProductInfor] = useState();
  const [state, dispatch] = useStore();
  const [productInCarts, setProductInCarts] = useState(1);
  const navigate = useNavigate();

  const [materials, setMaterial] = useState([]);
  console.log(productInCarts);
  useEffect(() => {
    const findProduct = state.products.find(product => {
      return product.name === productId;
    });
    const itemInCarts = state.carts.find(product => {
      return product.name === productId;
    });
    setProductInCarts(itemInCarts);
    setProductInfor(findProduct);
  }, [state]);
  useEffect(async () => {
    if (productInfor) {
      const promises = await productInfor.material.map(async item => {
        const docRef = doc(db, 'Materials', item.trim());
        const response = await getDoc(docRef);
        return response.data();
      });
      const Materials = await Promise.all(promises);
      setMaterial(Materials);
    }
  }, [productInfor]);
  const handleAddToCart = product => {
    dispatch(actions.addToCarts(product));
  };
  return (
    <Container className={classes.container} maxWidth={'lg'}>
      {productInfor ? (
        <>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img className={classes.image} src={productInfor.imageUrl} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className={styles.inforWrapper}>
                  <Typography
                    variant='h3'
                    component='div'
                    gutterBottom
                    sx={{
                      fontSize: 30,
                      marginBottom: 1.3,
                      fontFamily: 'Roboto',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}
                  >
                    Trọn bộ quà {productInfor.name}
                  </Typography>
                  <Typography
                    variant='h3'
                    component='div'
                    sx={{ fontSize: 15 }}
                  >
                    Giá tham khảo
                    <Typography
                      variant='h3'
                      component='div'
                      sx={{
                        fontSize: 30,
                        color: '#ff2b2b',
                        fontWeight: 'bold',
                      }}
                    >
                      {productInfor.price
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}
                      <Typography
                        variant='h3'
                        component='div'
                        gutterBottom
                        sx={{
                          fontSize: 15,
                          marginLeft: 1.3,
                          fontFamily: 'Roboto',
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          display: 'inline-block',
                        }}
                      >
                        vnđ
                      </Typography>
                    </Typography>
                  </Typography>
                  <Box>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>
                            <CardGiftcardIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Bộ quà bao gồm ${materials.length} sản phẩm`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>
                            <PeopleOutlineIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Phù hợp để làm quà cho người thân , bạn bè' />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>
                            <LockClockOutlinedIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Hạn sử dụng xem trên bao bì' />
                      </ListItem>
                    </List>
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <ButtonGroup disableElevation>
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() => handleAddToCart(productInfor)}
                      >
                        {productInfor.isInCarts
                          ? 'Xóa khỏi giỏ hàng'
                          : 'Thêm vào giỏ hàng'}
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/gio-hang');
                        }}
                      >
                        Giỏ hàng
                      </Button>
                    </ButtonGroup>
                  </Box>
                  {productInfor.isInCarts ? (
                    <Box sx={{ marginTop: 2, display: 'flex' }}>
                      <IconButton
                        aria-label='fingerprint'
                        color='primary'
                        onClick={() => {
                          dispatch(
                            actions.changeQuantity({
                              id: productInfor.id,
                              currentQuanty: productInCarts.quantity + 1,
                            })
                          );
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <Box
                        component='form'
                        sx={{
                          width: 0.2,
                        }}
                        noValidate
                        autoComplete='off'
                      >
                        <TextField
                          id='outlined-basic'
                          label='Số lượng'
                          variant='outlined'
                          size='small'
                          value={productInCarts.quantity}
                          sx={{
                            height: 0.3,
                          }}
                        />
                      </Box>
                      <IconButton
                        aria-label='fingerprint'
                        color='primary'
                        onClick={() => {
                          if (productInCarts.quantity !== 1) {
                            dispatch(
                              actions.changeQuantity({
                                id: productInfor.id,
                                currentQuanty: productInCarts.quantity - 1,
                              })
                            );
                          } else {
                            dispatch(actions.deleteFromCarts(productInfor));
                          }
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    ''
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={styles.materials}>
            <Typography
              variant='h3'
              component='div'
              gutterBottom
              sx={{
                fontSize: 50,
                textAlign: 'center',
                fontFamily: 'Brownhill',
                color: '#ff2b2b',
              }}
            >
              Trọn bộ quà {productInfor.name}
            </Typography>
            <Typography
              variant='h3'
              component='div'
              gutterBottom
              sx={{
                fontWeight: 'regular',
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 5,
                fontFamily: 'Roboto',
              }}
            >
              Hương vị thơm ngon, thiết kế sang trọng
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} className={styles.materialWrapper}>
                <ImageList cols={5}>
                  {materials.map((item, index) => (
                    <ImageListItem key={index} className={styles.materiaItem}>
                      <img
                        src={`${item.imageUrl}`}
                        srcSet={`${item.imageUrl}`}
                        alt={item.name}
                        loading='lazy'
                        className={styles.materialImage}
                        style={{
                          objectFit: 'contain',
                          height: 200,
                          maxHeight: 200,
                          borderColor: 'black',
                        }}
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={<span> {item.name}</span>}
                        position='below'
                        className={styles.materialTitle}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        ''
      )}
    </Container>
  );
}
