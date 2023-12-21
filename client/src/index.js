import React from "react"
import ReactDOM from "react-dom/client";

import App from "./App";
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={3000} maxSnack={2} anchorOrigin={{horizontal : "right", vertical : "top"}} style={{fontFamily : ["Lexend", "sans-serif"].join(","), fontSize : "16px"}}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)