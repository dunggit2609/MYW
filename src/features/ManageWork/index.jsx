import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import SpaceWork from "./pages/spaceWork";
import TableSpace from "./pages/tableSpace";

function ManageWork(props) {
  const match = useRouteMatch();
  return (
    <div>
          <Switch>
              <Route path={match.path} component={SpaceWork} exact/>
              <Route path={`${match.path}/:tableId`} component={TableSpace} exact/>
              <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default ManageWork;
