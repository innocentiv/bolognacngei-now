import * as React from "react";
import { useCreateMember, useUpdateMember } from "../../hooks/membership";
import { Formik, Form, Field } from "formik";
import { membershipSupporter } from "../../services/routes";
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
import { Enum_Member_Role } from "../../types/member";

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
  const updateMember = useUpdateMember();
  const classes = useStyles();
  const { navigate } = useLocation();

  interface Values {
    name: string;
  }

  return (
    <>
      <Typography variant="h5" component="h3">
        Diventa socio sostenitore
      </Typography>
      <Typography component="p">
        Il socio sostenitore non partecipa alle attività, ma offre il suo
        contributo alla sezione pagando una quota
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
          await updateMember(member.id, { role: Enum_Member_Role.Supporter });
          setSubmitting(false);
          navigate(membershipSupporter(member.id));
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.createMemberForm}>
            <Field
              name="name"
              type="text"
              label="Inserisci nome e cognome del socio sostenitore"
              component={TextField}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Diventa socio sostenitore
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
