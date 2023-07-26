import React, { useEffect } from 'react'
import ButtonAppBar from '../Components/AppBar'
import Footer from '../Components/Footer'
import { Button, Box, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'

export default function Thankyou() {
    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        enqueueSnackbar("Order placed successfully", { variant: "success" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <header>
                <ButtonAppBar />
            </header>
            <main>
                <Box sx={{ background: "#a5f2bb", textAlign: 'center', height: '80vh', pt: 20 }} >
                    <Typography variant='h6' gutterBottom>
                        Yay! It's ordered &#128515;
                    </Typography>
                    <Typography variant='caption' gutterBottom sx={{ display: "block" }} >
                        You will recieve an invoice for your order shortly
                    </Typography>
                    <Typography variant='caption' gutterBottom sx={{ display: "block", mb: 2 }}>
                        Your order will arive in 7 business days
                    </Typography>
                    <Button variant="contained" color='success' style={{ textTransform: 'initial' }} >
                        {
                            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }} >Continue Shopping</Link>
                        }

                    </Button>
                </Box>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
