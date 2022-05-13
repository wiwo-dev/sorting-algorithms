import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import { theme } from "theme";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/700.css";

import "focus-visible/dist/focus-visible";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </BrowserRouter>,

  document.getElementById("root")
);
