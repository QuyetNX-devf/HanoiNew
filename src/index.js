import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";

import "./assets/fonts/EuclidSquare-Regular.woff";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "app/store";
import { ThemeProviderContext } from "context/ThemeContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProviderContext>
            <App />
          </ThemeProviderContext>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
