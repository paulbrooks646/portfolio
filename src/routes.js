import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Alley from "./Components/Alley/Alley";
import Blacksmith from "./Components/Blacksmith/Blacksmith";
import Castle from "./Components/Castle/Castle";
import Cave from "./Components/Cave/Cave";
import Dragon from "./Components/Dragon/Dragon"
import Forest from "./Components/Forest/Forest";
import Garden from "./Components/Garden/Garden";
import Throne from "./Components/Throne/Throne";
import Market from "./Components/Market/Market";
import Mountain from "./Components/Mountain/Mountain";
import Nest from "./Components/Nest/Nest";
import Pass from "./Components/Pass/Pass";
import Stables from "./Components/Stables/Stables";
import Store from "./Components/Store/Store";
import Swamp from "./Components/Swamp/Swamp";
import Tower from "./Components/Tower/Tower";
import Town from "./Components/Town/Town";
import Valley from "./Components/Valley/Valley"

export default (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/Auth" component={Auth} />
    <Route path="/Alley" component={Alley} />
    <Route path="/Blacksmith" component={Blacksmith} />
    <Route path="/Castle" component={Castle} />
    <Route path="/Cave" component={Cave} />
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/Dragon" component={Dragon}/>
    <Route path="/Forest" component={Forest} />
    <Route path="/Garden" component={Garden} />
    <Route path="/Throne" component={Throne} />
    <Route path="/Market" component={Market}/>
    <Route path="/Mountain" component={Mountain} />
    <Route path="/Nest" component={Nest} />
    <Route path="/Pass" component={Pass} />
    <Route path="/Stables" component={Stables} />
    <Route path="/Store" component={Store} />
    <Route path="/Swamp" component={Swamp} />
    <Route path="/Tower" component={Tower} />
    <Route path="/Town" component={Town} />
    <Route path="/Valley" component={Valley}/>
  </Switch>
);
