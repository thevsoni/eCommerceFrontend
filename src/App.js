import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import { React, useEffect } from "react";
import Home from "./component/Home/Home.js";
import ToastContainer from './component/notification/ToastContainer';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignup from './component/User/LoginSignup';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <ToastContainer />

      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={< ProductDetails />} />
        <Route path='/products' element={< Products />} />
        <Route path='/products/:keyword' element={< Products />} />
        <Route path='/search' element={< Search />} />

        <Route path='/login' element={< LoginSignup />} />
        <Route path='/account' element={isAuthenticated ? < Profile /> : <LoginSignup />} />
        {/* {isAuthenticated && <Route path='/account' element={isAuthenticated ? < Profile /> : <LoginSignup />} />} */}
        {/* it doesnt work */}
        {/* <ProtectedRoute path='/account' element={< Profile />} /> */}
        {/* it is also not working because i am using custome route ,but it is giving me an error */}
        {/* <Route
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        /> */}
        {/* it is also not giving my desired output */}
        <Route path='/me/update' element={isAuthenticated ? < UpdateProfile /> : <LoginSignup />} />
        <Route path='/password/update' element={isAuthenticated ? < UpdatePassword /> : <LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<Shipping />} />

        <Route path='/order/confirm' element={isAuthenticated ? < ConfirmOrder /> : <LoginSignup />} />






      </Routes>
      <Footer />

    </Router >
  );
}

export default App;
