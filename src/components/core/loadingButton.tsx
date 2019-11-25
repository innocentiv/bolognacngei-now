import React from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      marginLeft: theme.spacing(1)
    }
  })
);

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  disabled,
  isLoading,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <Button {...otherProps} disabled={disabled && isLoading}>
      {children}
      {isLoading && <CircularProgress size="1em" className={classes.loading} />}
    </Button>
  );
};

export default LoadingButton;
