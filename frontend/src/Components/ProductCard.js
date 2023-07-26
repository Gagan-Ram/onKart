import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../Css/ProductCard.css'
import { config } from '../App';
import axios from 'axios';
import { useSnackbar } from 'notistack'
import { localStorageContext } from '../Contexts/LocalStorageContext';

export default function ProductCard({ product, cartItems, itemAddedToCart, setItemAddedToCart }) {

    const { enqueueSnackbar } = useSnackbar();

    let flag = 0;

    const { userId, userEmail } = useContext(localStorageContext)
    
    const addToCart = (event) => {
        // console.log(event.target.id)
        const productId = event.target.id;
        const email = userEmail;

        if (userId) {

            const body = {
                userId: userId,
                productId: productId,
                email: email
            }

            cartItems.forEach((item, index) => {
                if (productId === item.product._id) {
                    flag = !flag;
                }
            });

            if (!flag) {
                const url = config.endpoint

                axios.post(`${url}cart`, body)
                    .then((res) => {
                        // console.log(res.data)
                        // setCartItemExist(false)
                        setItemAddedToCart(!itemAddedToCart)
                        enqueueSnackbar("Item successfully added to the cart", { variant: "success" })
                        flag = !flag;
                    })
                    .catch(() => {
                        enqueueSnackbar("couldn't add item to the cart", { variant: "error" });
                    })
            }
            else {
                enqueueSnackbar("Item already exist in the cart. Use the cart sidebar to update quantity or item", { variant: "warning" })
            }
        }
        else {
            enqueueSnackbar("Login to add Item",{variant:'warning'})
        }
    }

    return (
        <>
            <Card sx={{ maxWidth: '100%' }} >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt="Product Image"
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    />
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography gutterBottom variant="body1" component="div" noWrap>
                            {product.name}
                        </Typography>
                        <Typography variant="button" gutterBottom  >
                            ${product.cost}
                        </Typography>
                        <Box>
                            <Rating name="read-only" value={product.rating} readOnly />
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="medium" color="success" startIcon={<AddShoppingCartIcon />} variant="contained" sx={{ width: "100%" }}
                        id={product._id}
                        onClick={addToCart}
                    >
                        Add to Cart
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
