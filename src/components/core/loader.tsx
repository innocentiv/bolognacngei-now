import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, CircularProgress } from "@material-ui/core";

export interface LoaderProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingPlaceholder: {
      minHeight: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  })
);

export default function Loader(props: LoaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.loadingPlaceholder}>
      <CircularProgress />
    </div>
  );
}
