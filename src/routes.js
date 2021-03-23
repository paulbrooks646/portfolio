import React from "react";
import { Switch, Route } from "react-router-dom";
import { Main } from "./Main";
import { Auth } from "./Melvin/Auth/Auth";

export default (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/Auth" component={Auth} />
  </Switch>
);
