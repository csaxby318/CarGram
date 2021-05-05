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
import * as actionCreators from './components/store/creators/actionCreators';
import AddCarPage from './components/AddCarPage';
import MyCarPage from './components/MyCarPage';
import AddPhotosPage from './components/AddPhotosPage';
import EditCarPage from './components/EditCarPage';
import MyCarPhotosPage from './components/MyCarPhotosPage';

// creates the Central Store (which stores the entire application state)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jsonwebtoken');
setAuthenticationHeader(token)

// perform a dispatch to change the global state based on the token
if(token) {
  store.dispatch(actionCreators.userLogin(token))
}


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
            <Route path="/add-photos/:carId" component={AddPhotosPage} />
            <Route path="/edit-car/:carId" component={EditCarPage} />
            <Route path="/my-car-photos/:carId" component={MyCarPhotosPage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
