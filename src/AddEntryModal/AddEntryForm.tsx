import React, { useState } from "react";

import { EntryTypeOption } from "./FormField";
import { Entry, EntryType } from "../types";
import { HealthCheckForm } from "./HealthCheckForm";
import { OccupationalHealthcareForm } from "./OccupationalHealthcareForm";
import { HospitalForm } from "./HospitalForm";

/*
 * use type Entry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = useState("HealthCheck" as EntryType)

  return (
    <div>
      <select value={entryType} onChange={({ target }) => setEntryType(target.value as EntryType)} className="ui dropdown">
        {entryTypeOptions.map(option => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
      {entryType === "HealthCheck" && <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />}
      {entryType === "Hospital" && <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />}
      {entryType === "OccupationalHealthcare" && <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />}
      {/* <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} /> */}
    </div>
  );
};

export default AddEntryForm;
