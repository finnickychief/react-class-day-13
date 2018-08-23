import React, { Component } from 'react';
import { addProduct } from '../../actions';

export default class AddProductForm extends Component {
  state = {
    name: '',
    description: '',
    price: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  addProduct = e => {
    e.preventDefault();
    const newProduct = {
      name: this.state.name,
      description: this.state.description,
      price: Number(this.state.price)
    };

    addProduct(newProduct, this.props.dispatch);
    this.props.history.push('/');
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <form className="form-signin w-50" onSubmit={this.addProduct}>
          <h1 className="h3 mb-3 font-weight-normal">Add a Product</h1>
          <label htmlFor="inputName" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="Product Name"
            name="name"
            required
            autoFocus
            onChange={this.onChange}
          />
          <label htmlFor="inputDescription" className="sr-only">
            Description
          </label>
          <input
            type="text"
            id="inputDescription"
            className="form-control"
            name="description"
            placeholder="Product Description"
            required
            onChange={this.onChange}
          />
          <label htmlFor="inputPrice" className="sr-only">
            Price
          </label>
          <input
            type="number"
            id="inputPrice"
            className="form-control"
            name="price"
            placeholder="Product Price"
            required
            onChange={this.onChange}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Add
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>
    );
  }
}
