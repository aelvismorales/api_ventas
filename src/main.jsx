import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
