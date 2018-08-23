import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CartItem from './CartItem';
import paypal from 'paypal-checkout';

const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });

export default class Cart extends Component {
  state = {
    price: 5.0
  };
  componentDidMount() {
    this.setState({
      price: this.generatePrice()
    });
  }

  onSuccess = payment => console.log('Successful payment!', payment);

  onError = error =>
    console.log('Erroneous payment OR failed to load script!', error);

  onCancel = data => console.log('Cancelled payment!', data);

  generatePrice() {
    return this.props.cartItems
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0)
      .toFixed(2);
  }
  onAuthorize(data, actions) {
    // Optional: display a confirmation page here

    return actions.payment.execute().then(function() {
      // Show a success page to the buyer
    });
  }

  render() {
    const CLIENT = {
      sandbox: '',
      production: 'xxxXXX'
    };
    const ENV =
      process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

    const { cartItems, dispatch } = this.props;

    const payment = () => {
      return paypal.rest.payment.create(ENV, CLIENT, {
        transactions: [
          {
            amount: { total: this.state.price, currency: 'USD' }
          }
        ]
      });
    };

    const cartList = cartItems.map((item, index) => (
      <CartItem
        product={item}
        key={`item-${index}`}
        dispatch={dispatch}
        cart={cartItems}
      />
    ));

    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={this.state.price}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onCancel={this.onCancel}
          payment={payment}
          onAuthorize={this.onAuthorize}
        />
        {cartList}
      </div>
    );
  }
}
