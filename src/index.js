import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <MoralisProvider
    appId="jSNJF41s7SzkzGYrB3e06qs87w1BUv92AJyHyOGa"
    serverUrl="https://oxl58o7jwnnw.usemoralis.com:2053/server"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
