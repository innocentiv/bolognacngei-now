import * as React from "react";
import { useAuthActions, useAuthError } from "../hooks/auth";
import {
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
  CircularProgress
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import ButtonLink from "../components/buttonLink";

import { register } from "../services/routes";
import PageWrapper from "../components/pageWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: theme.spacing(3)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    },
    link: {
      marginTop: theme.spacing(3)
    }
  })
);

interface Values {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuthActions();
  const error = useAuthError();
  const classes = useStyles();

  return (
    <PageWrapper>
      <Typography variant="h4" component="h2">
        Modifica un iscrizione
      </Typography>
      <Typography component="p">
        Inserisci utente e password per gestire le iscrizioni
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: ""
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
          return errors;
        }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          try {
            await login(email, password);
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
              label="Inserisci l'email"
              component={TextField}
            />
            <Field
              type="password"
              name="password"
              label="Inserisci la password"
              component={TextField}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Entra
              {isSubmitting && (
                <CircularProgress size="1em" className={classes.loading} />
              )}
            </Button>
            {error && (
              <Typography component="p" color="error">
                {error.message}
              </Typography>
            )}
            <ButtonLink
              to={register()}
              component={Button}
              variant="outlined"
              color="primary"
              className={classes.link}
            >
              Mai entrato prima? Registrati
            </ButtonLink>
          </Form>
        )}
      />
    </PageWrapper>
  );
};

export default Login;
