import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonAppBar from '../Components/AppBar'
import TextField from '@mui/material/TextField';
import Footer from '../Components/Footer'
import { Button, InputAdornment, IconButton, Typography, Stack } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

import Cart from '../Components/Cart';
import { config } from '../App';
import { useSnackbar } from 'notistack'
// import { useNavigate } from 'react-router-dom';
import { localStorageContext } from '../Contexts/LocalStorageContext';


const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);



export default function Checkout() {
    const { userId } = useContext(localStorageContext)

    const cartId = userId

    const { enqueueSnackbar } = useSnackbar();
    // const navigate = useNavigate()

    const [cartItemsCheckout, setCartItemsCheckout] = useState([])
    const [address, setAddress] = useState('')
    const [changeAddress, setChangeAddress] = useState('')

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed successfully!");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    // console.log(cartItemsCheckout.length)

    const [flag, setFlag] = useState(0)
    const addnewAddress = () => {
        setFlag(1)
    }

    const patchTheAddress = () => {
        const id = document.getElementById('outlined-multiline-static')
        const patchValue = id.value
        setChangeAddress(patchValue)

        if (patchValue === '') {
            enqueueSnackbar("Please add the address in order to update your address", { variant: "warning" })
        }
        else {

            const url = config.endpoint;

            axios.patch(`${url}users/${userId}`, { "address": patchValue })
                .then((res) => {
                    // console.log(res.data)
                    enqueueSnackbar("Updated address successfully", { variant: "success" })
                })
                .catch((err) => {
                    enqueueSnackbar(err, { variant: "error" })
                })

        }
    }

    const cancle = () => {
        setFlag(0)
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        // const cost = event.target.value;
        // console.log("Inside PlaceOrder cost---------------->"+cost)
        // console.log(`${config.endpoint}checkout/sessions`)

        await axios.post(`${config.endpoint}checkout/sessions`, {
            cartId : cartId
        })
            .then((res) => {
                // console.log("payment successfull"+res.data.url);
                window.location = res.data.url
            })
            .catch((error) => {
                console.error(error)
            })

        // navigate("/thankyou")
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const orderDetails = [["Products"], ["Sub-Total"], ["Shipping Charges"]];

    useEffect(() => {
        const url = config.endpoint;

        axios.get(`${url}cart/${cartId}`)
            .then((res) => {
                // console.log(res.data.cartItems)
                setCartItemsCheckout(res.data.cartItems)

            })
            .catch((error) => {
                // console.log("Items Not fetched" + error)
                enqueueSnackbar("Please check your internet connection", { variant: "warning" })
            })

        axios.get(`${url}users/${cartId}?q=address`)
            .then((res) => {
                setAddress(res.data.address)
            })
            .catch((error) => {
                enqueueSnackbar("Address couldn't fetch, Please check your internet connection", { variant: "warning" })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeAddress])

    function subTotal() {
        let total = 0;
        cartItemsCheckout.forEach(element => {
            // console.log(element)
            total += (element.quantity * element.product.cost)
        });
        // console.log(total);
        return total
    }

    (function () {
        // Products length
        orderDetails[0].push(cartItemsCheckout.length)

        // sub-Total
        orderDetails[1].push(subTotal());

        // shipping charges
        orderDetails[2].push(0);

    })();


    return message ? (
        <Message message={message} />
    ) : (
        <>

            <header>
                <ButtonAppBar showCartAndSearch={false} />
            </header>

            <main>
                <Box sx={{ flexGrow: 1, pt: 2, pb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={8} >
                            <Item sx={{ textAlign: "left", p: 5 }} >
                                <Box>
                                    <Typography variant='body1' style={{ fontSize: '1.4rem' }} color='#3e3d3d' gutterBottom>
                                        Shipping
                                    </Typography>
                                    <Typography sx={{ mb: 3, letterSpacing: '-0.025em' }} variant='subtitle2' gutterBottom>
                                        Manage all shipping address you want. This way you won't have to enter the shipping address manually with every order. select the address you want to get your order delivered.
                                    </Typography>
                                </Box>
                                <hr style={{ color: 'rgb(229, 229, 229)' }} />

                                <Box sx={{ width: '100%', pt: 2 }}>
                                    {
                                        (address === "ADDRESS_NOT_SET") ?

                                            <Typography variant='body2' gutterBottom>
                                                No address found for this account.Please add one to proceed.
                                            </Typography>

                                            :

                                            // address.map( (value, key) => (
                                            <OutlinedInput
                                                sx={{ width: '100%', mb: 4, mt: 2 }}
                                                id="outlined-adornment-password"
                                                defaultValue={address}
                                                readOnly
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={addnewAddress}
                                                            edge="end"
                                                        >
                                                            <EditIcon color='success' />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        // ) )
                                    }
                                </Box>
                                <Button
                                    variant="contained"
                                    color='success'
                                    style={{ textTransform: 'initial' }}
                                    startIcon={<HomeOutlinedIcon />}
                                    onClick={addnewAddress} >
                                    Add new address
                                </Button>
                                <Box sx={{ display: flag ? "block" : "none" }} >
                                    <TextField
                                        sx={{ mt: 2, mb: 2 }}
                                        id="outlined-multiline-static"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder='Enter your complete address'
                                    />
                                    <Button variant="contained" color='success' style={{ textTransform: 'initial' }} onClick={patchTheAddress} >Add</Button>
                                    <Button variant="text" color='success' style={{ textTransform: 'initial' }} onClick={cancle} >Cancel</Button>
                                </Box>
                                <Box>
                                    <Typography variant='body1' style={{ fontSize: '1.4rem', marginTop: '20px' }} color='#3e3d3d' gutterBottom>
                                        Payment
                                    </Typography>

                                    <Typography sx={{ mb: 3, letterSpacing: '-0.025em' }} variant='subtitle2' gutterBottom>
                                        Payment method
                                    </Typography>
                                </Box>
                                <hr style={{ color: 'rgb(229, 229, 229)' }} />

                                <Box>
                                    <Typography variant='body1' style={{ fontSize: '1.4rem', marginTop: '20px' }} color='#3e3d3d' gutterBottom>
                                        Card
                                    </Typography>
                                    {/* <Typography sx={{ mb: 3, letterSpacing: '-0.025em' }} variant='subtitle2' gutterBottom>
                                        Pay ${
                                            (orderDetails[1][1] + orderDetails[2][1])
                                        } of available $5000
                                    </Typography> */}

                                    {/* <form action="/create-checkout-session" method="POST"> */}
                                    <Button variant="contained" color='success' style={{ textTransform: 'initial' }} startIcon={<WalletOutlinedIcon />} onClick={placeOrder} value={(orderDetails[1][1] + orderDetails[2][1])}
                                    >Place Order</Button>
                                    {/* </form> */}
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}  >
                            <Item>
                                {
                                    cartItemsCheckout.map((value, index) => (
                                        <Cart item={value} qty={true} key={index} />
                                    ))
                                }
                            </Item>
                            <Item sx={{ mt: 2 }}>
                                <Box sx={{ width: '100%', textAlign: 'left' }} >
                                    <Stack spacing={2}>
                                        <Typography variant='body1' style={{ fontSize: '1.4em', }} color='#3e3d3d' gutterBottom>
                                            Order Details
                                        </Typography>
                                        {
                                            orderDetails.map((value, index) => (
                                                <Box sx={{ display: "flex", justifyContent: "space-between", pl: 1, pr: 1 }} key={index} >
                                                    <Typography variant='caption' style={{ fontSize: '0.9em', lineHeight: 0 }} color='#3e3d3d' gutterBottom>
                                                        {value[0]}
                                                    </Typography>
                                                    <Typography variant='subtitle2' sx={{ color: "black" }} >
                                                        {
                                                            (value[0] === "Products") ?
                                                                value[1] :
                                                                "$" + value[1]
                                                        }

                                                    </Typography>
                                                </Box>
                                            ))
                                        }
                                        <Box sx={{ display: "flex", justifyContent: "space-between", pl: 1, pr: 1 }}>
                                            <Typography variant='body1' style={{ fontSize: '1.4em' }} color='#3e3d3d' gutterBottom>
                                                Total
                                            </Typography>
                                            <Typography variant='body1' style={{ fontSize: '1.4em' }} color='#3e3d3d' gutterBottom>
                                                ${""}
                                                {
                                                    (orderDetails[1][1] + orderDetails[2][1])
                                                }

                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}
