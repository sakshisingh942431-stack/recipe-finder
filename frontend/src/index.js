import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// React App ko DOM me render karna
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
