import * as React from "react";
import { useAuthActions, useAuthError } from "../hooks/auth";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import ButtonLink from "../components/buttonLink";
import { login } from "../services/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2)
    },
    loginWrapper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    },
    item: {
      width: "100%",
      maxWidth: "480px"
    },
    loginForm: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: theme.spacing(2)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    },
    link: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Values {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: React.FC = () => {
  const { register } = useAuthActions();
  const error = useAuthError();
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item className={classes.item}>
        <Paper className={classes.loginWrapper}>
          <Typography variant="h4" component="h2">
            Nuova Iscrizione
          </Typography>
          <Typography component="p">Registra un nuovo socio.</Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: ""
            }}
            validate={values => {
              const errors: Partial<Values> = {};
              if (!values.email) {
                errors.email = "Devi inserire l'email";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Indirizzo email non valido";
              }
              if (!values.password) {
                errors.password = "Devi scegliere una password";
              } else if (!values.passwordConfirmation) {
                errors.passwordConfirmation =
                  "Devi ripetere la password appena inserita";
              } else if (values.password !== values.passwordConfirmation) {
                errors.passwordConfirmation = "Le password non coincidono";
              }
              return errors;
            }}
            onSubmit={async ({ email, password }, { setSubmitting }) => {
              try {
                await register(email, password);
              } catch (error) {
                console.error(error);
              }
              setSubmitting(false);
            }}
            render={({ isSubmitting }) => (
              <Form className={classes.loginForm}>
                <Field
                  name="email"
                  type="email"
                  label="Inserisci l'email del tutore"
                  component={TextField}
                />

                <Field
                  type="password"
                  name="password"
                  label="Scegli una nuova password"
                  component={TextField}
                />
                <Field
                  type="password"
                  name="passwordConfirmation"
                  label="Ripeti la password scelta"
                  component={TextField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Registra un nuovo socio
                  {isSubmitting && (
                    <CircularProgress size="1em" className={classes.loading} />
                  )}
                </Button>
                {error && (
                  <Typography component="p" color="error">
                    {error.message}
                  </Typography>
                )}
              </Form>
            )}
          />
          <ButtonLink
            to={login()}
            component={Button}
            variant="outlined"
            color="primary"
            className={classes.link}
          >
            Ti sei già registrato? Clicca per Entrare
          </ButtonLink>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
