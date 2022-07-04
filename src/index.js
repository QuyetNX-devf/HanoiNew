import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";

import "./assets/fonts/EuclidSquare-Regular.woff";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "app/store";
import { ThemeProviderContext } from "context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProviderContext>
          <App />
        </ThemeProviderContext>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
