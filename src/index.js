import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import {CookiesProvider} from 'react-cookie';


ReactDOM.render(
    <Router>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </Router>,
    document.getElementById("root")
);
registerServiceWorker();
