import * as React from "react";
import { useAuthActions, useAuthError } from "../../hooks/auth";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import PageWrapper from "../../components/pageWrapper";
import { ValidatorHelper } from "../../utils/validatorHelper";
import LoadingButton from "../../components/core/loadingButton";
import { useParams } from "react-router-dom";
import { auth } from "../../services/routes";
import { useNavigate } from "../../hooks/router";
import { withSnackbar, WithSnackbarProps } from "notistack";

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
  password: string;
  passwordConfirmation: string;
}

const Forgot: React.FC<WithSnackbarProps> = ({ enqueueSnackbar }) => {
  const { confirmPasswordReset } = useAuthActions();
  const navigate = useNavigate();
  const { code } = useParams();
  const error = useAuthError();
  const classes = useStyles();

  return (
    <>
      <PageWrapper>
        <Formik
          initialValues={{
            password: "",
            passwordConfirmation: ""
          }}
          validate={values => {
            const validator = new ValidatorHelper<Values>(values);

            validator.requireField("password", "Devi scegliere una password");
            validator.requireField(
              "passwordConfirmation",
              "Devi ripetere la password appena inserita"
            );

            const errors = validator.getErrors();
            if (values.password !== values.passwordConfirmation) {
              errors.passwordConfirmation = "Le password non coincidono";
            }

            return errors;
          }}
          onSubmit={async ({ password }, { setSubmitting }) => {
            if (code) {
              try {
                await confirmPasswordReset(code, password);
                enqueueSnackbar("Password modificata con successo", {
                  variant: "success"
                });
              } catch (error) {
                console.error(error);
              }
              setSubmitting(false);
              navigate(auth());
            }
          }}
          render={({ isSubmitting }) => (
            <Form className={classes.loginForm}>
              <Typography variant="h4" component="h2">
                Scegli una nuova password
              </Typography>
              <Typography component="p">
                Scegli una nuova password per il tuo account. La nuova password
                deve avere almeno 6 caratteri
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
                Conferma cambio della password
              </LoadingButton>
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

export default withSnackbar(Forgot);
