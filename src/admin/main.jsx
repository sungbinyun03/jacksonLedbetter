import React from "react";
import ReactDOM from "react-dom/client";
import AdminApp from "./AdminApp";
import AdminGate from "./AdminGate";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminGate>
      <AdminApp />
    </AdminGate>
  </React.StrictMode>
);

