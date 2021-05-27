import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Main from './containers/main.jsx'
import Game from './containers/game.jsx'


const initialState = {
  curUsr: gon.user,
  games: gon.games
}

const reducers = combineReducers({
  curUsr: (state = null, action) => state,
  games: (state = null, action) => state
});

const middlewares = applyMiddleware(reduxPromise);

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/games/:id" component={Game} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

