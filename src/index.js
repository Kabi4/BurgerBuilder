import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/Reducers/burgerBuilder';
import orderReducer from './store/Reducers/order';
import fetchOrderReducer from './store/Reducers/fetchOrders';
import authReducer from './store/Reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  fetchOrder: fetchOrderReducer,
  auth: authReducer
});

const store = createStore(rootReducer,composeEnhancers(
      applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
