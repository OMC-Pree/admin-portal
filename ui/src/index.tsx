import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./theme";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./app/App";
import { store } from "./app/store";

// Use mock API
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

// Ignore Provider error. App still works, its just a type warning.
// https://github.com/facebook/react/issues/24304
ReactDOM.render(
  <StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/* @ts-ignore */}
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
