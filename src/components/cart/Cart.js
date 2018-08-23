import React, { Component } from 'react';
import CartItem from './CartItem';

export default class Cart extends Component {
  render() {
    const { cartItems, dispatch } = this.props;

    const cartList = cartItems.map((item, index) => (
      <CartItem
        product={item}
        key={`item-${index}`}
        dispatch={dispatch}
        cart={cartItems}
      />
    ));

    return <div>{cartList}</div>;
  }
}
