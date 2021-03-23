import React from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "./App";
import { Auth } from "./Melvin/Auth/Auth";

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/main" component={Auth} />
  </Switch>
);
