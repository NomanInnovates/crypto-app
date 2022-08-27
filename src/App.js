import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CoinPage from "./Pages/CoinPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact render={(props) => <Home />} />
        <Route path="/CoinPage/:id" exact render={(props) => <CoinPage />} />
      </Router>
    </div>
  );
}

export default App;
