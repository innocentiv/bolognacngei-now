import * as React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface IWelcomeProps {}

const useStyles = makeStyles({
  image: {
    display: "block",
    width: "60%",
    margin: "auto"
  }
});

const Welcome: React.FC<IWelcomeProps> = () => {
  const classes = useStyles();
  return (
    <>
      <img className={classes.image} src="/assets/scout.svg" alt="" />
      <Typography variant="h4" component="h2">
        Iscrizioni CNGEI 2019-2020
      </Typography>
      <Typography component="p">
        Benvenuto nel sito delle iscrizioni per l'anno scout 2019/2020. Per ogni
        necessità di carattere tecnico scrivi a{" "}
        <a href="mailto:info@vinnocenti.com">info@vinnocenti.com</a>
      </Typography>
    </>
  );
};

export default Welcome;
