import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import OrderHistory from "../customer/components/Order/OrderHistory";
import OrderDetails from "../customer/components/Order/OrderDetails";

const CustomerRouter = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/browse" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order-history" element={<OrderHistory />} />
        <Route
          path="/account/order-history/:orderId"
          element={<OrderDetails />}
        />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouter;
