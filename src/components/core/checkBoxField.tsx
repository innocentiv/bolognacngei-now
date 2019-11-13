import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  FormHelperText
} from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.main
    }
  })
);

interface CheckBoxFieldProps<Values> {
  name: Extract<keyof Values, string>;
  label: string;
  errors: Partial<
    {
      [k in keyof Values]: string;
    }
  >;
}

export const CheckBoxField = <Values extends unknown>({
  name,
  label,
  errors
}: CheckBoxFieldProps<Values>): React.ReactElement => {
  const classes = useStyles();
  const hasError = errors && !!errors[name];
  return (
    <>
      <Field
        name={name}
        Label={{
          label
        }}
        component={CheckboxWithLabel}
        className={hasError ? classes.error : ""}
      />
      {hasError && (
        <FormHelperText className={classes.error}>
          {errors[name]}
        </FormHelperText>
      )}
    </>
  );
};

export default CheckBoxField;
