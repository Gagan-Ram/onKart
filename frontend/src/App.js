import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Checkout from './Pages/Checkout';
import Thankyou from './Pages/Thankyou';
import CartContext from './Contexts/CartContext';
import HomeContext from './Contexts/UserContext';
import LocalStorageContext from './Contexts/LocalStorageContext';

export const config = {
  endpoint: process.env.REACT_APP_WEBSITE_ENDPOINT,
};

function App() {

  return (
    <>

      <CartContext>
        <HomeContext>
          <LocalStorageContext>

            <Router  >
              <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thankyou" element={<Thankyou />} />
                <Route exact path="/" element={<Home />} />

              </Routes>
            </Router>

          </LocalStorageContext>
        </HomeContext>
      </CartContext>
    </>

  );
}

export default App;
