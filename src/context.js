// Global context for entire application
import React from 'react';
import firebase from './firebase';

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
    default:
      return state;
  }
};

// Provider
export class Provider extends React.Component {
  state = {
    productList: [],
    cartItems: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
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
