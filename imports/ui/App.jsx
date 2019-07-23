import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ReduxApp from './components/ReduxApp.jsx';

const App = () => (
  <div>
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  </div>
);

export default App;
