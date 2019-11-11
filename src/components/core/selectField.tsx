import React, { PropsWithChildren } from "react";
import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import { Field } from "formik";
import { Select } from "formik-material-ui";

interface SelectFieldProps<Values> {
  name: Extract<keyof Values, string>;
  label: string;
  errors: Partial<
    {
      [k in keyof Values]: string;
    }
  >;
}

export const SelectField = <Values extends unknown>({
  name,
  label,
  errors,
  children
}: PropsWithChildren<SelectFieldProps<Values>>): React.ReactElement => {
  const hasError = errors && !!errors[name];
  return (
    <FormControl error={hasError}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field
        name={name}
        component={Select}
        inputProps={{
          id: name
        }}
      >
        {" "}
        {children}
      </Field>
      {hasError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};
