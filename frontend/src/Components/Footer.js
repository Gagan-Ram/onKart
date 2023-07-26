import React from 'react'
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
        <>
            <div style={{ textAlign:"center" ,backgroundColor: "black", color: "white", height: `calc(100vh - 8.9vh - 80vh)` }}>
                <Typography variant="h5" gutterBottom>
                    OnKart
                </Typography>
                <Typography variant="caption" gutterBottom>
                    OnKart is your one step solution to buy the latest trending items with India's Fastest Delivery to your doorstep
                </Typography>
            </div>
        </>
    )
}
