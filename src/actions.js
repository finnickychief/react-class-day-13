import firebase from './firebase';

export const addProduct = (product, dispatch) => {
  // Add to database here later
  const productsRef = firebase.database().ref('products');

  productsRef.push(product);
};

export const addToCart = (item, dispatch, cart) => {
  // add item to localStorage

  localStorage.setItem('cart', JSON.stringify(cart.concat([item])));

  dispatch({
    type: 'ADD_TO_CART',
    payload: item
  });
};

export const removeFromCart = (removedItem, dispatch, cart) => {
  // remove item from localStorage
  localStorage.setItem(
    'cart',
    JSON.stringify(cart.filter(item => item.name !== removedItem.name))
  );

  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: removedItem
  });
};
