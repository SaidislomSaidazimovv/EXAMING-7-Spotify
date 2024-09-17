import React from "react";
import LoginRoutes from "./routes/Login";
import DashboardRoutes from "./routes/Dashboard";
import "./App.css"

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return code ? <DashboardRoutes code={code} /> : <LoginRoutes />;
}

export default App;
