import React, { Component } from 'react';
import Product from './Product';

export default class ProductList extends Component {
  render() {
    const { productList, dispatch, cart } = this.props;

    const productElements = productList.map((product, index) => (
      <Product
        key={`product-${index}`}
        product={product}
        dispatch={dispatch}
        cart={cart}
      />
    ));

    const divStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: '5px'
    };

    return <div style={divStyle}>{productElements}</div>;
  }
}
