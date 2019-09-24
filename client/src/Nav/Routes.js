import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import RelatedArticles from "../Pages/RelatedArticles";

const Routing = props => {
  const isAdmin = props.isAdmin;
  const email = props.email;

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} isAdmin={isAdmin} email={email} />
            )}
          />
          <Route
            path="/home"
            render={props => (
              <Home {...props} isAdmin={isAdmin} email={email} />
            )}
          />
          <Route
            path="/related-articles"
            render={props => <RelatedArticles {...props} isAdmin={isAdmin} />}
          />
        </Switch>
      </Router>
    </>
  );
};

export default Routing;
