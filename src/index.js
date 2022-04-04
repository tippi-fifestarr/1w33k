import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <MoralisProvider
    appId="mJEamOQwchYYcOUsH27wCGQDHtM8AfquQChSntQv"
    serverUrl="https://0xee4fzuqeju.usemoralis.com:2053/server"
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
