import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
    </Switch>
  );
}

export default App;
