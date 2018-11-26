import React, { Component } from 'react';
import './App.css';
import Main from './component/Main'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './redux/store'

const store = createStore(reducer)
const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        {/* <ul> */}
        {/* <li> */}
        {/* <Link to="/">Main</Link> */}
        {/* </li> */}
        {/* <li>
          <Link to="/homepage">HomePage</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/nav">Nav</Link>
        </li>
        <li>
          <Link to="/transaction">Transaction</Link>
        </li> */}
        {/* </ul> */}

        {/* <hr /> */}

        <Route exact path="/" component={Main} />
        {/* <Route path="/homepage" component={HomePage} />
      <Route path="/nav" component={Nav} />
      <Route path="/account" component={Account} />
      <Route path="/transaction" component={Transaction} /> */}
      </div>
    </Router>
  </Provider>
);

export default App;
