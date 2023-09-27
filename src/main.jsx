import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { CompradorContextProvider } from "./context/CompradorContext.jsx";
import { NotaContextProvider } from "./context/NotaContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProductContextProvider>
        <CompradorContextProvider>
          <NotaContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NotaContextProvider>
        </CompradorContextProvider>
      </ProductContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
