import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { NewHospitalEntry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = NewHospitalEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
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
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
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
        if (!values.discharge.date) {
          errors.discharge = typeof errors.discharge === "object" ? { ...errors.discharge, date: requiredError } : { date: requiredError }
        }
        if (!values.discharge.criteria) {
          errors.discharge = typeof errors.discharge === "object" ? { ...errors.discharge, criteria: requiredError } : { criteria: requiredError }
        }
        if (values.discharge.date && !isValidDate(values.discharge.date)) {
          errors.discharge = typeof errors.discharge === "object" ? { ...errors.discharge, date: "Not a valid date, correct form is: YYYY-MM-DD" } : { date: "Not a valid date, correct form is: YYYY-MM-DD" }
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
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
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

export default HospitalForm;
