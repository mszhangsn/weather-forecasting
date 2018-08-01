import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import './index.css';
import App from './components/App';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>
    	<Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);


