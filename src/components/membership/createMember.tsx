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
import { useNavigate } from "../../hooks/router";

interface ICreateMemberProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createMemberForm: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginTop: theme.spacing(3)
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
  const navigate = useNavigate();

  interface Values {
    name: string;
  }

  return (
    <>
      <Typography variant="h4" component="h2">
        Registra un nuovo socio
      </Typography>
      <Typography component="p">
        Inserisci nome e cognome del socio da iscrivere. Assicurati di avere con
        te tutta la documentazione necessaria prima di proseguire.
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
              label="Inserisci nome e cognome dello scout"
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
