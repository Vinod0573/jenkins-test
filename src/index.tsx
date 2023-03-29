import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

// const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
      </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);

