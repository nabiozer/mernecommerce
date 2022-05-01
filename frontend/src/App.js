import React from "react";
import {  Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
       
         
          <Switch>
          <Route path="/product/:id"  exact>
            <ProductPage />
          </Route>
          <Route path="/cart/:id?" exact>
            <CartPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/shipping" exact>
            <ShippingPage />
          </Route>
          <Route path="/payment" exact>
            <PaymentPage />
          </Route>
          <Route path="/placeorder" exact>
            <PlaceOrderPage />
          </Route>
          <Route path="/orders/:id" exact>
            <OrderPage />
          </Route>
          <Route path="/admin/userList" exact>
            <UserListPage />
          </Route>
          <Route path="/admin/user/:id/edit" exact>
            <UserEditPage />
          </Route>

          <Route path="/admin/orders" exact>
            <OrderListPage />
          </Route>

          <Route path="/admin/product/:id/edit" exact>
            <ProductEditPage />
          </Route>
          <Route path="/admin/productlist/" exact>
            <ProductListPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    
    </>
  );
};

export default App;
