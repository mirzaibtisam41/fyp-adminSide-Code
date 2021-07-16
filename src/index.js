import React from 'react';
import ReactDom from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store, persistor } from "./Store/StoreFile/Store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById("root")
);
