import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <ListingsProvider> */}
    <App />
    {/* </ListingsProvider> */}
  </AuthProvider>
);
