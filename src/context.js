// Global context for entire application
import React from 'react';
import firebase, { auth, authProvider } from './firebase';

const Context = React.createContext();

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems]
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.name !== action.payload.name
        )
      };
    }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

// Provider
export class Provider extends React.Component {
  state = {
    productList: [],
    cartItems: [],
    user: null,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });

    const productsRef = firebase.database().ref('products');

    productsRef.on('value', snapshot => {
      let products = snapshot.val(); // Get list of all products

      let productList = [];

      for (let product in products) {
        productList.push({
          id: product,
          name: products[product].name,
          description: products[product].description,
          price: products[product].price
        });
      }
      this.setState({ productList: productList });
    });

    let storedCart = [];
    localStorage.getItem('cart')
      ? (storedCart = JSON.parse(localStorage.getItem('cart')))
      : localStorage.setItem('cart', JSON.stringify([]));

    this.setState({
      cartItems: storedCart
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Consumer
export const Consumer = Context.Consumer;
