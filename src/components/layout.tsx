import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import * as React from "react";
import { useAuthActions } from "../hooks/auth";
import Home from "../pages/home";
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
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    "& > a": {
      color: "inherit",
      textDecoration: "none"
    }
  }
});

const Layout: React.FC<{}> = () => {
  const { logout } = useAuthActions();
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={home()}>Bologna CNGEI Iscrizioni</Link>
          </Typography>
          <ButtonLink color="inherit" to={overview()}>
            Overview
          </ButtonLink>
          <ButtonLink color="inherit" to={register()}>
            Register
          </ButtonLink>
          <ButtonLink color="inherit" to={login()}>
            Login
          </ButtonLink>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <RedirectUserRoute
          exact
          path={home()}
          component={Home}
          to={overview()}
        />
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
