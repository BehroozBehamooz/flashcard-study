import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import Home from "./home/Home";
import NotFound from "./NotFound";

function Layout() {
  return (
    
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Header />
        <Switch>
          <Route path="/">
              <Home />
          </Route>
          <Route>
              <NotFound />
          </Route>

        </Switch>
        
      </div>
  );
}

export default Layout;
