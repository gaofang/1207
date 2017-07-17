import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import createStore from 'redux/lib/createStore';
import combineReducers from 'redux/lib/combineReducers';
import {Provider} from 'react-redux';
import * as reducers from './reducers';
// import './lib/auth/token';

import './common.css';

const reducer = combineReducers({
  ...reducers
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   // eslint-disable-line
);

const routes = {
  path: '/',
  childRoutes: [
    {
      // 报告列表
      path: '1207',
      getComponents(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./Test').default);
        });
      }
    }
  ]
};

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  </AppContainer>,
  document.getElementById('approot')
);

if (process.env.NODE_ENV === 'dev') {
  /* eslint-disable */
  if (module.hot) {
    module.hot.accept(
      [
        './Test'
      ], () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        require('./Test');
        ReactDOM.render(
          <AppContainer>
            <Provider store={store}>
              <Router history={browserHistory}>
              </Router>
            </Provider>
          </AppContainer>,
          document.getElementById('approot')
        );
      });
  }
}