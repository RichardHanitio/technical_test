import React from "react"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state/store"

import App from "./App";
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000} maxSnack={2} anchorOrigin={{horizontal : "right", vertical : "top"}} style={{fontFamily : ["Lexend", "sans-serif"].join(","), fontSize : "16px"}}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
)