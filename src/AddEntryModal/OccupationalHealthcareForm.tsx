import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { NewOccupationalHealthcareEntry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = NewOccupationalHealthcareEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


export const OccupationalHealthcareForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()

  const isValidDate = (dateStr: any): Boolean => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateStr.match(regEx)) return false;

    let d = new Date(dateStr);
    let dNum = d.getTime();

    if (!dNum && dNum !== 0) return false;

    return d.toISOString().slice(0, 10) === dateStr;
  }

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | { [field: string]: string } } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !isValidDate(values.date)) {
          errors.date = "Not a valid date, correct form is: YYYY-MM-DD";
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave && !isValidDate(values.sickLeave.startDate)) {
          errors.sickLeave = typeof errors.sickLeave === "object" ? { ...errors.sickLeave, startDate: "Not a valid date, correct form is: YYYY-MM-DD" } : { startDate: "Not a valid date, correct form is: YYYY-MM-DD" }
        }
        if (values.sickLeave && !isValidDate(values.sickLeave.endDate)) {
          errors.sickLeave = typeof errors.sickLeave === "object" ? { ...errors.sickLeave, endDate: "Not a valid date, correct form is: YYYY-MM-DD" } : { endDate: "Not a valid date, correct form is: YYYY-MM-DD" }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;
