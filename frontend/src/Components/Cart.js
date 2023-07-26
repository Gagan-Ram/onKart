import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Counter from './Counter';


export default function Cart({ item, qty }) {

    // console.log(item)

    return (
        <Card variant='none' sx={{ display: 'flex', mt: 2.5, mr: 0.5, mb: 1.5 }} >
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.product.image}
                alt="item-image"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="body2">
                        {item.product.name}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }} >
                    {
                        !qty ?
                            <Counter countOfquantity={item.quantity} cartItemsId={item._id} />
                            :
                            <Typography variant="button" gutterBottom sx={{ textTransform: "none" }} >
                                Qty : {item.quantity}
                            </Typography>
                    }
                    <Box sx={{ position: 'absolute', right: 1.5 }}>
                        <Typography variant="button" gutterBottom>
                            ${item.product.cost}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Card>
    );
}
