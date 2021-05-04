import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseLayout from './components/BaseLayout'
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import UserProfilePage from './components/UserProfilePage';

// the createStore component is needed in order to create the Central Store
import { createStore } from 'redux';
// the Provider component makes the redux store available to any nested component
import { Provider } from 'react-redux';
// the reducer receives actions, then updates the application state
import reducer from './components/store/reducer';

import { setAuthenticationHeader } from './components/utils/authenticate';
import AddCarPage from './components/AddCarPage';
import MyCarPage from './components/MyCarPage';

// creates the Central Store (which stores the entire application state)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jsonwebtoken');
setAuthenticationHeader(token)

// perform a dispatch to change the global state based on the token
store.dispatch({type: 'ON_LOGIN', payload: token})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/my-profile" component={UserProfilePage} />
            <Route path="/add-car" component={AddCarPage} />
            <Route path="/my-car" component={MyCarPage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
