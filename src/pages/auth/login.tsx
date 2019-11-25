import * as React from "react";
import { useState, useCallback } from "react";
import { useAuthActions, useAuthError } from "../../hooks/auth";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import PageWrapper from "../../components/pageWrapper";
import Welcome from "../../components/membership/welcome";
import { ValidatorHelper } from "../../utils/validatorHelper";
import LoadingButton from "../../components/core/loadingButton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: theme.spacing(3)
      }
    },
    link: {
      marginTop: theme.spacing(3)
    }
  })
);

interface Values {
  email: string;
  password: string;
  passwordConfirmation: string;
}

enum Pages {
  EmailCheck = "emailcheck",
  Login = "login",
  Register = "register",
  Forgot = "forgot"
}

const Login: React.FC = () => {
  const { register, login, isEmailRegistered, forgot } = useAuthActions();
  const [page, setPage] = useState<Pages>(Pages.EmailCheck);
  const [sendingEmail, setSendingEmail] = useState(false);
  const error = useAuthError();
  const classes = useStyles();

  const goToStart = useCallback(() => setPage(Pages.EmailCheck), [setPage]);
  const goToLogin = useCallback(() => setPage(Pages.Login), [setPage]);
  const goToRegister = useCallback(() => setPage(Pages.Register), [setPage]);
  const goToForgot = useCallback(() => setPage(Pages.Forgot), [setPage]);

  return (
    <>
      <PageWrapper>
        <Welcome />
      </PageWrapper>
      <PageWrapper>
        {page !== Pages.EmailCheck && (
          <Typography
            variant="body1"
            component="span"
            style={{ margin: "0 auto 1.5rem 0" }}
          >
            <IconButton onClick={goToStart} size="small">
              <ArrowBackIos /> Indietro
            </IconButton>{" "}
          </Typography>
        )}

        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: ""
          }}
          validate={values => {
            const validator = new ValidatorHelper<Values>(values);
            if (page === Pages.EmailCheck) {
              validator.requireField("email", "Devi inserire l'email");
              validator.validateRegex(
                "email",
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                "Indirizzo email non valido"
              );
            }
            if (page === Pages.Login) {
              validator.requireField("password", "Devi scegliere una password");
            }
            if (page === Pages.Register) {
              validator.requireField("password", "Devi scegliere una password");
              validator.requireField(
                "passwordConfirmation",
                "Devi ripetere la password appena inserita"
              );
            }

            const errors = validator.getErrors();
            if (
              page === Pages.Register &&
              values.password !== values.passwordConfirmation
            ) {
              errors.passwordConfirmation = "Le password non coincidono";
            }

            return errors;
          }}
          onSubmit={async ({ email, password }, { setSubmitting }) => {
            if (page === Pages.EmailCheck) {
              try {
                if (await isEmailRegistered(email)) {
                  setSubmitting(false);
                  return goToLogin();
                } else {
                  setSubmitting(false);
                  return goToRegister();
                }
              } catch (error) {
                console.error(error);
              }
            }

            if (page === Pages.Login) {
              try {
                await login(email, password);
              } catch (error) {
                console.error(error);
              }
              setSubmitting(false);
            }

            if (page === Pages.Register) {
              try {
                await register(email, password);
              } catch (error) {
                console.error(error);
              }
              setSubmitting(false);
            }
          }}
          render={({ isSubmitting, values }) => (
            <Form className={classes.loginForm}>
              {page === Pages.EmailCheck && (
                <>
                  <Typography variant="h4" component="h2">
                    Accesso adulto o tutore
                  </Typography>
                  <Typography component="p">
                    Inserisci la tua mail. Se non è presente un utente
                    registrato con questa mail ti verrà chiesto di creare un
                    nuovo utente.
                  </Typography>
                  <Field
                    name="email"
                    type="email"
                    label="Inserisci l'email del tutore"
                    component={TextField}
                  />
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Prosegui
                  </LoadingButton>
                </>
              )}
              {page === Pages.Login && (
                <>
                  <Typography variant="h4" component="h2">
                    Inserisci la tua password
                  </Typography>
                  <Typography component="p">
                    Inserisci la password per {values.email}
                  </Typography>
                  <Field
                    autoFocus
                    type="password"
                    name="password"
                    label="Inserisci la password scelta"
                    component={TextField}
                  />

                  <LoadingButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Entra
                  </LoadingButton>
                  <LoadingButton
                    variant="outlined"
                    onClick={async () => {
                      setSendingEmail(true);
                      await forgot(values.email);
                      setSendingEmail(false);
                      goToForgot();
                    }}
                    isLoading={sendingEmail}
                  >
                    Ho dimenticato la password
                  </LoadingButton>
                </>
              )}
              {page === Pages.Register && (
                <>
                  <Typography variant="h4" component="h2">
                    Registrazione di un nuovo utente
                  </Typography>
                  <Typography component="p">
                    Scegli una nuova password per {values.email}. La nuova
                    password deve avere almeno 6 caratteri
                  </Typography>
                  <Field
                    autoFocus
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
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Registra un nuovo utente
                  </LoadingButton>
                </>
              )}
              {page === Pages.Forgot && (
                <>
                  <Typography variant="h4" component="h2">
                    Password dimenticata
                  </Typography>
                  <Typography component="p">
                    Abbiamo inviato una mail a {values.email}. Clicca sul link
                    ricevuto nella mail per recuperare la password.
                  </Typography>
                  <Button onClick={goToStart} variant="outlined">
                    Torna all'inserimento dell'email
                  </Button>
                </>
              )}
              {error && (
                <Typography component="p" color="error">
                  {error.message}
                </Typography>
              )}
            </Form>
          )}
        />
      </PageWrapper>
    </>
  );
};

export default Login;
