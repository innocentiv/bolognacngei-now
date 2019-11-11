import * as React from "react";
import { useCreateMember } from "../../hooks/membership";
import { Formik, Form, Field } from "formik";
import { membershipData } from "../../services/routes";
import {
  Button,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
  Typography
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useLocation } from "../../hooks/router";

interface ICreateMemberProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createMemberForm: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: theme.spacing(2)
      }
    },
    loading: {
      marginLeft: theme.spacing(1)
    }
  })
);

const CreateMember: React.FC<ICreateMemberProps> = () => {
  const createMember = useCreateMember();
  const classes = useStyles();
  const { navigate } = useLocation();

  interface Values {
    name: string;
  }

  return (
    <>
      <Typography variant="h4" component="h2">
        Registra un nuovo socio
      </Typography>
      <Formik
        initialValues={{
          name: ""
        }}
        validate={values => {
          const errors: Partial<Values> = {};
          if (!values.name) {
            errors.name = "Devi inserire il nome dello scout";
          }
          return errors;
        }}
        onSubmit={async ({ name }, { setSubmitting }) => {
          const member = await createMember(name);
          setSubmitting(false);
          navigate(membershipData(member.id));
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.createMemberForm}>
            <Field
              name="name"
              type="text"
              label="Inserisci il nome dello scout"
              component={TextField}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Iscrivi un nuovo scout
              {isSubmitting && (
                <CircularProgress size="1em" className={classes.loading} />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateMember;
