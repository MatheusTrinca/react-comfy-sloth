import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  ProductsPage,
  AboutPage,
  SingleProductPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
} from './pages';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/products">
          <ProductsPage />
        </Route>
        <Route exact path="/products/:id" children={<SingleProductPage />} />
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <PrivateRoute exact path="/checkout">
          <CheckoutPage />
        </PrivateRoute>
        <Route patch="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
