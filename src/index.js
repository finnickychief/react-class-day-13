import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, Consumer } from './context';

ReactDOM.render(
  <Provider>
    <Consumer>
      {store => {
        return <App context={store} />;
      }}
    </Consumer>
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
