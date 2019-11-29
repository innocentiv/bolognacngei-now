import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import * as React from "react";
import { Suspense } from "react";
import { useAuthActions, useUser } from "../hooks/auth";

import { home, membership, overview, auth } from "../services/routes";
import { PrivateRoute } from "./privateRoute";
import { RedirectUserRoute } from "./redirectUserRoute";
import { Link, Redirect, Route, useLocation } from "react-router-dom";
import { useScrollIntoView } from "../hooks/ui";
import Loader from "./core/loader";
const Membership = React.lazy(() => import("../pages/membership"));
const Overview = React.lazy(() => import("../pages/overview"));
const Auth = React.lazy(() => import("../pages/auth"));

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    "& > a": {
      color: "inherit",
      textDecoration: "none"
    },
    marginLeft: "1em"
  }
});

const Layout: React.FC<{}> = () => {
  const { logout } = useAuthActions();
  const classes = useStyles();
  const [, , empty] = useUser();
  const location = useLocation();
  const ref = useScrollIntoView<HTMLDivElement>([location]);

  return (
    <>
      <AppBar position="static" ref={ref}>
        <Toolbar>
          <Avatar src="/assets/cngei-logo.png" alt="" />
          <Typography variant="h6" className={classes.title}>
            <Link to={home()}>Bologna CNGEI Iscrizioni</Link>
          </Typography>
          {!empty && (
            <Button onClick={logout} color="inherit">
              Esci
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Route exact path={home()}>
          <Redirect to={overview()} />
        </Route>
        <Suspense fallback={<Loader />}>
          <RedirectUserRoute path={auth()} component={Auth} to={overview()} />
          <PrivateRoute path={overview()} component={Overview} />
          <PrivateRoute path={membership()} component={Membership} />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
