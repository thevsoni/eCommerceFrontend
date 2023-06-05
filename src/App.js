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


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={< ProductDetails />} />
        <Route path='/products' element={< Products />} />
        <Route path='/products/:keyword' element={< Products />} />
        <Route path='/search' element={< Search />} />

      </Routes>
      <Footer />

    </Router >
  );
}

export default App;
