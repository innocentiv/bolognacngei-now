import * as React from "react";
import { Paper, makeStyles, Theme, createStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useScrollIntoView } from "../hooks/ui";
import { useUser } from "../hooks/auth";
import Loader from "./core/loader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2)
    },
    wrapper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      "& > *": {
        marginTop: theme.spacing(3)
      }
    },
    item: {
      width: "100%",
      maxWidth: "620px"
    }
  })
);

const PageWrapper: React.FC = ({ children }) => {
  const ref = useScrollIntoView<HTMLDivElement>();
  const user = useUser();
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container} ref={ref}>
      <Grid item className={classes.item}>
        <Paper className={classes.wrapper}>
          {user.isLoaded ? children : <Loader />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PageWrapper;
