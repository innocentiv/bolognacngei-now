import * as React from "react";
import { useAuthActions, useAuthError } from "../hooks/auth";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import ButtonLink from "../components/buttonLink";
import { login } from "../services/routes";
import PageWrapper from "../components/pageWrapper";
import Welcome from "../components/membership/welcome";

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
    <>
      <PageWrapper>
        <Welcome />
      </PageWrapper>
      <PageWrapper>
        <Typography variant="h4" component="h2">
          Registrazione adulto o tutore
        </Typography>
        <Typography component="p">
          Registrati come adulto o tutore per proseguire le iscrizioni. Nota, le
          credenziali di accesso di due anni fa non sono più valide, dovrai
          quindi registrare un nuovo utente per le iscrizioni di quest'anno.
        </Typography>
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
          Ti sei già registrato? Clicca per entrare
        </ButtonLink>
      </PageWrapper>
    </>
  );
};

export default Register;
