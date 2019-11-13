export class ValidatorHelper<Values> {
  values: Partial<Values>;
  errors: Partial<{ [k in keyof Values]: string }> = {};

  constructor(values: Partial<Values>) {
    this.values = values;
  }

  requireField(fieldName: keyof Values, errorDescription: string) {
    if (!this.values[fieldName]) {
      this.errors[fieldName] = errorDescription;
    }
  }

  validateRegex(
    fieldName: keyof Values,
    regex: RegExp,
    errorDescription: string
  ) {
    if (this.values[fieldName] && !regex.test(String(this.values[fieldName]))) {
      this.errors[fieldName] = errorDescription;
    }
  }

  getErrors() {
    return this.errors;
  }
}
