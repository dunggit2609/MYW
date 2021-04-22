import { CircularProgress } from "@material-ui/core";
import Footer from "components/Footer";
import HamburgerNav from "components/hamburgerNav";
import Header from "components/Header";
import NotFound from "components/NotFound";
import PrivateRoute from "components/PrivateRoute";
import { _LIST_LINK } from "constant/config";
import LoginPage from "features/Auth/pages/login";
import RegisterPage from "features/Auth/pages/register";
import ManageWork from "features/ManageWork";
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.scss";
import "./features/multiLanguage/i18n.js";

function App() {
  const HomePage = React.lazy(() => import("./features/HomePage"));
  const routerLink = _LIST_LINK;
  // const history = useHistory();
  // const isLogin = localStorage.getItem(AUTH.TOKEN_KEY);
  // if (!!isLogin) {
  //   history.push(_LIST_LINK.manageWork);
  // }
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="container_lazy">
            <CircularProgress color="secondary" />
          </div>
        }
      >
        <Header/>
        <Switch>
          <Redirect from={routerLink.home} to={routerLink.index} exact />
          <Route path="/" component={HomePage} exact></Route>
          <Route path={routerLink.register} component={RegisterPage} exact />
          <Route path={routerLink.login} component={LoginPage} exact />
          <PrivateRoute
            path={routerLink.manageWork}
            component={ManageWork}
            exact
          />
          <Route path={routerLink.notFound} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </Suspense>
      <HamburgerNav />
    </div>
  );
}

export default App;
