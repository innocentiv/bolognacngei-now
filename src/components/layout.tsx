import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import * as React from "react";
import { useAuthActions, useUser } from "../hooks/auth";
import Login from "../pages/login";
import Membership from "../pages/membership";
import Overview from "../pages/overview";
import Register from "../pages/register";
import {
  home,
  login,
  membership,
  overview,
  register
} from "../services/routes";
import ButtonLink from "./buttonLink";
import { PrivateRoute } from "./privateRoute";
import { RedirectUserRoute } from "./redirectUserRoute";
import { Link, Redirect, Route, useLocation } from "react-router-dom";
import { useScrollIntoView } from "../hooks/ui";

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
  const user = useUser();
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
          {user.isEmpty ? (
            <>
              <ButtonLink color="inherit" to={register()}>
                Registrati
              </ButtonLink>
              <ButtonLink color="inherit" to={login()}>
                Entra
              </ButtonLink>{" "}
            </>
          ) : (
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
        <RedirectUserRoute path={login()} component={Login} to={overview()} />
        <RedirectUserRoute
          path={register()}
          component={Register}
          to={overview()}
        />
        <PrivateRoute path={overview()} component={Overview} />
        <PrivateRoute path={membership()} component={Membership} />
      </main>
    </>
  );
};

export default Layout;
