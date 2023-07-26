import React from 'react';
import HomeContext from '../Contexts/UserContext';
import AppBar from '../Components/AppBar'
import Footer from '../Components/Footer';

import SimplePaper from '../Components/SimplePaper';

import kartImage from '../Assets/onKart_register_image.png';
import { Box } from '@mui/material';

export default function Register() {

    const forBackGroundImageInsert = {
        backgroundImage: `url(${kartImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: "80vh"
    }

    // const { username, setUsername } = useContext(userContext);
    // console.log("username====="+username);

    return (
        <>
            <header>
                <AppBar />
            </header>
            <main>
                <HomeContext>
                    <Box style={forBackGroundImageInsert}>
                        <SimplePaper register={true} />
                    </Box>
                </HomeContext>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
