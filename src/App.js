import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AddProductForm from './components/products/AddProductForm';
import ProductList from './components/products/ProductList';
import Cart from './components/cart/Cart';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container" style={{ marginTop: '80px' }}>
            <Switch>
              <Route exact path="/">
                <ProductList
                  productList={this.props.context.productList}
                  dispatch={this.props.context.dispatch}
                  cart={this.props.context.cartItems}
                />
              </Route>
              <Route
                path="/cart"
                render={props => (
                  <Cart
                    cartItems={this.props.context.cartItems}
                    dispatch={this.props.context.dispatch}
                  />
                )}
              />
              <Route
                path="/addProduct"
                render={props => (
                  <AddProductForm
                    {...props}
                    dispatch={this.props.context.dispatch}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
