import * as React from "react";
import { Paper, makeStyles, Theme, createStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useScrollIntoView } from "../hooks/ui";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2)
    },
    wrapper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    },
    item: {
      width: "100%",
      maxWidth: "480px"
    }
  })
);

const PageWrapper: React.FC = ({ children }) => {
  const ref = useScrollIntoView<HTMLDivElement>();
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container} ref={ref}>
      <Grid item className={classes.item}>
        <Paper className={classes.wrapper}>{children}</Paper>
      </Grid>
    </Grid>
  );
};

export default PageWrapper;
