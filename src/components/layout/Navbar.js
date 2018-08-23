import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginAction, logoutAction } from '../../actions';

class Navbar extends Component {
  logout = dispatch => {
    logoutAction(dispatch);
  };

  login = dispatch => {
    loginAction(dispatch);
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Link className="navbar-brand" to="/">
            Shopping Cart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              {this.props.context.user ? (
                <li>
                  <Link className="nav-link" to="/addProduct">
                    New Product
                  </Link>
                </li>
              ) : null}
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            {this.props.context.user ? (
              <button
                onClick={this.logout.bind(this, this.props.context.dispatch)}
                className="btn btn-primary"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={this.login.bind(this, this.props.context.dispatch)}
                className="btn btn-primary"
              >
                Log In
              </button>
            )}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
