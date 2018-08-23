import React, { Component } from 'react';
import { removeFromCart } from '../../actions';

export default class CartItem extends Component {
  // todo: add remove handler

  render() {
    const { name, price } = this.props.product;
    return (
      <div className="card text-left w-25">
        <div className="card-header">
          <h5>Name: {name}</h5>
        </div>
        <div className="card-body">
          <p>Price: ${price.toFixed(2)}</p>
          <button
            className="btn btn-danger"
            onClick={removeFromCart.bind(
              this,
              this.props.product,
              this.props.dispatch,
              this.props.cart
            )}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
