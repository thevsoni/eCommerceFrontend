import './App.css';
import Axios from "./Axios";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import { React, useEffect, useState } from "react";
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
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await Axios.get("/api/v1/stripeapikey", { withCredentials: true });
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log("user not logged in to get strip api key")
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
    getStripeApiKey();

  }, []);
  // console.log(stripeApiKey)
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
        <Route path='/account' element={isAuthenticated === true ? < Profile /> : <LoginSignup />} />
        <Route path='/me/update' element={isAuthenticated === true ? < UpdateProfile /> : <LoginSignup />} />
        <Route path='/password/update' element={isAuthenticated === true ? < UpdatePassword /> : <LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={isAuthenticated === true ? <Shipping /> : <LoginSignup />} />

        <Route path='/order/confirm' element={isAuthenticated === true ? < ConfirmOrder /> : <LoginSignup />} />

        {/* we need to bind my payment component inside element */}
        <Route path="/process/payment" element={isAuthenticated === true ? (
          stripeApiKey
            ?
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
            :
            <LoginSignup /> //it will redirect user in his account page.
        ) : (
          <LoginSignup />
        )} />

        <Route path="/success" element={isAuthenticated === true ? <OrderSuccess /> : <LoginSignup />} />
        <Route path="/orders" element={isAuthenticated === true ? <MyOrders /> : <LoginSignup />} />
        <Route path="/order/:id" element={isAuthenticated === true ? <OrderDetails /> : <LoginSignup />} />

        <Route path="/admin/dashboard" element={isAuthenticated === true ? (user?.role === 'admin' ? <Dashboard /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/products" element={isAuthenticated === true ? (user?.role === 'admin' ? <ProductList /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/product" element={isAuthenticated === true ? (user?.role === 'admin' ? <NewProduct /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/product/:id" element={isAuthenticated === true ? (user?.role === 'admin' ? <UpdateProduct /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/orders" element={isAuthenticated === true ? (user?.role === 'admin' ? <OrderList /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/order/:id" element={isAuthenticated === true ? (user?.role === 'admin' ? <ProcessOrder /> : <LoginSignup />) : <LoginSignup />} />

        <Route path="/admin/users" element={isAuthenticated === true ? (user?.role === 'admin' ? <UsersList /> : <LoginSignup />) : <LoginSignup />} />
        <Route path="/admin/user/:id" element={isAuthenticated === true ? (user?.role === 'admin' ? <UpdateUser /> : <LoginSignup />) : <LoginSignup />} />


        <Route path="/admin/reviews" element={isAuthenticated === true ? (user?.role === 'admin' ? <ProductReviews /> : <LoginSignup />) : <LoginSignup />} />


      </Routes>
      <Footer />

    </Router >
  );
}

export default App;
