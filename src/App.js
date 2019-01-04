import React, { Component } from 'react';
import './App.css';
import Main from './screen/Main'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './redux/store'

const store = createStore(reducer)
const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        {/* gọi component Main */}
        <Route exact path="/" component={Main} />
      </div>
    </Router>
  </Provider>
);

export default App;
