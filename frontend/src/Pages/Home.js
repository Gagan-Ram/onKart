import AppBar from '../Components/AppBar'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import kartImage from '../Assets/onKart_register_image.png';
import Footer from '../Components/Footer';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import { config } from '../App';
import ProductCard from '../Components/ProductCard';
import Cart from '../Components/Cart';
import { useSnackbar } from 'notistack'
import { MyCartContext } from '../Contexts/CartContext';
import { Button, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { localStorageContext } from '../Contexts/LocalStorageContext';

// import SkeletonBody from '../Components/SkeletonBody'
import '../Css/Home.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24
};


export default function Home() {

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:899px)');

  const { count } = useContext(MyCartContext)

  const forBackGroundImageInsert = {
    backgroundImage: `url(${kartImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "14rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "fill"
  }

  // const heroHighlight = {
  //   color: "#212121",
  //   fontWeight: "700",
  //   background: "#ffb825",
  //   borderRadius: "5px",
  //   padding: "0.2rem"
  // }

  // const herHeading = {
  //   color: "#fff",
  //   fontSize: "1.5rem",
  //   width: "80%",
  //   position: "relative",
  //   left: "25em"
  // }


  const [productsList, setProductsList] = useState([])
  const [displayCartItems, setDisplayCartItems] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [itemAddedToCart, setItemAddedToCart] = useState(false)

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchItem, setSearchItem] = useState('')
  const [timerID, setTimerId] = useState('')
  // const [isLoading, setIsLoading] = useState(true)

  const { userId } = useContext(localStorageContext)

  const url = config.endpoint;
  useEffect(() => {

    axios.get(`${url}product`)
      .then((res) => {
        // console.log(res.data)
        setProductsList(res.data)

      })
      .catch((res) => {
        enqueueSnackbar("Backend is not connected, try again later", { variant: "error" })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cartId = userId

  useEffect(() => {
    // const url = config.endpoint;

    axios.get(`${url}cart/${cartId}`)
      .then((res) => {
        // console.log(res.data.cartItems)
        setCartItems(res.data.cartItems)
      })
      .catch((error) => {
        console.error("Items Not fetched" + error)
        // enqueueSnackbar("Please check your internet connection", { variant: "warning" })
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, itemAddedToCart])

  function getItems() {

    axios.get(`${url}product/search?value=${searchItem}`)
      .then((res) => {
        setProductsList(res.data)
      })
      .catch((error) => {
        console.error("Items Not fetched" + error)
      })
  }

  useEffect(() => {

    timerID && clearTimeout(timerID)

    const newTimerID = setTimeout(() => {
      getItems();
      // setIsLoading(false)
    }, 2000);

    setTimerId(newTimerID)

    return function () {
      clearTimeout(timerID)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItem])


  const checkOut = () => {
    navigate("/checkout")
  }

  function subTotal() {
    let total = 0;
    cartItems.forEach(element => {
      total += (element.quantity * element.product.cost)
    });
    return total
  }

  return (
    <>
      <header >

        <AppBar displayCartItems={displayCartItems} setDisplayCartItems={setDisplayCartItems} setOpen={setOpen} searchItem={searchItem} setSearchItem={setSearchItem} showCartAndSearch={true} />
        
      </header>
      <main>
        <Box style={forBackGroundImageInsert} >
          {/* <p style={herHeading} >
            India’s <span style={heroHighlight}>FASTEST DELIVERY</span>{" "}
            to your door step
          </p> */}
        </Box>
        <Grid container spacing={2} >

          <Grid item lg={displayCartItems ? 9 : 12} md={ displayCartItems ? 8 : 12} sm={12}>
            {/* {
              isLoading && (
                <SkeletonBody />
              )
            } */}
            {
              (productsList.length !== 0) ? (
                <Item>
                  <Box sx={{ m: 2 }} >
                    <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                      {
                        productsList.map((value, index) => (
                          <Grid item lg={3} md={6} sm={6} xs={12} key={index} >

                            <ProductCard product={value} cartItems={cartItems} itemAddedToCart={itemAddedToCart} setItemAddedToCart={setItemAddedToCart} />

                          </Grid>
                        ))
                      }
                    </Grid>
                  </Box>
                </Item>

              ) :
                <Typography variant="overline" display="block" gutterBottom sx={{ textAlign: 'center', height: '50vh' }} >
                  &#128528; <br /> No products found!
                </Typography>
            }
          </Grid>

          {
            !isSmallScreen &&

            <Grid
              style={{ display: (displayCartItems) ? 'block' : 'none' }}
              item
              lg={3}
              md={4}
              sm={0}
              sx={{ p: cartItems.length ? 0 : 15 }}
            >
              {cartItems.length !== 0 ? (
                <Box class="cartItemsClass" sx={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
                  {
                    cartItems.map((value, index) => (
                      <Grid item key={index}>
                        <Cart item={value} />
                      </Grid>
                    ))
                  }

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitile2' gutterBottom >
                      Order total
                    </Typography>
                    <Typography variant='h6' gutterBottom >
                      ${subTotal()}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ textTransform: 'initial' }}
                    onClick={checkOut}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Checkout
                  </Button>

                </Box>
              ) : (
                <Typography variant="overline" gutterBottom>
                  <span>&#128533;</span> No items found! Add items to your cart to see them here.
                </Typography>
              )}
            </Grid>

          }

          {
            (isSmallScreen) && (

                <Modal
                  open={open}
                  onClose={handleClose}
                  style={{ height: '100vh' }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} >
                    <Button sx={{position:'fixed', right:0}} onClick={handleClose} endIcon={<CloseIcon />}></Button>
                    {cartItems.length !== 0 ? (
                      <Box sx={{ p:2 }}>
                        {
                          cartItems.map((value, index) => (
                            <Box item key={index}>
                              <Cart item={value} />
                            </Box>
                          ))
                        }

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='subtitile2' gutterBottom >
                            Order total
                          </Typography>
                          <Typography variant='h6' gutterBottom >
                            ${subTotal()}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="success"
                          style={{ textTransform: 'initial' }}
                          onClick={checkOut}
                          startIcon={<ShoppingCartIcon />}
                        >
                          Checkout
                        </Button>

                      </Box>
                    ) : (
                      <Typography variant="overline" gutterBottom>
                        <span>&#128533;</span> No items found! Add items to your cart to see them here.
                      </Typography>
                    )}
                  </Box>
                </Modal>
            )
          }

        </Grid >
      </main >
      <footer>
        <Footer />
      </footer>
    </>
  )
}
