import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { config } from '../App';
import axios from 'axios';
import { localStorageContext } from '../Contexts/LocalStorageContext';
import { MyCartContext } from '../Contexts/CartContext';

export default function Counter({ countOfquantity, cartItemsId }) {
    // let increment = 0;
    // let decrement = 0;  
    const { setCount } = useContext(MyCartContext)
    // console.log("count----------------" + count)
    // console.log(setCount)

    const api = `${config.endpoint}cart`;
    
    const {userId} = useContext(localStorageContext)
    const cartId = userId
    async function deleteItem() {
        // console.log('cartItemsId=============' + cartItemsId);
        const body = {
            cartItemsId: cartItemsId
        };

        await axios.delete(`${api}/${cartId}`, { data: body })
            .then((res) => {
                // console.log(res.data);
                console.log(`Item deleted ${cartItemsId} suceessfully from the cart`)
            })
            .catch((error) => {
                console.error("Could not delete item from the cart",error);
            });

    }

    const increaseCount = async () => {
        countOfquantity = countOfquantity + 1
        console.log(countOfquantity);
        setCount(countOfquantity);

        const body = {
            cartId: userId,
            cartItemsId: cartItemsId,
            increment: 1,
            decrement: 0,
        };

        await axios.patch(api, body)
            .then((res) => {
                // console.log(res.data);
            })
            .catch((err) => {
                console.error('Could not update order count');
            });
    };

    const decreaseCount = async () => {
        countOfquantity = countOfquantity - 1;
        // console.log(countOfquantity);
        setCount(countOfquantity);

        const body = {
            cartId: userId,
            cartItemsId: cartItemsId,
            increment: 0,
            decrement: 1,
        };

        if (!countOfquantity) {
            await deleteItem()
        } else {
            await axios.patch(api, body)
                .then((res) => {
                    // console.log(res.data);
                    console.log("Item count incresed successfully")
                })
                .catch((err) => {
                    console.error('Could not update order count');
                });
        }
    };



    return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
        <Button size='small' startIcon={<RemoveIcon />} onClick={decreaseCount}></Button>
        <Typography variant='button' sx={{ textAlign: 'center' }} gutterBottom>
          {countOfquantity}
        </Typography>
        <Button size='small' startIcon={<AddIcon />} onClick={increaseCount}></Button>
      </Box>
      
    );
}
