import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENTDETAILS";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSESLIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    id: string;
    payload: Entry;
  };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENTDETAILS',
    payload: patient
  };
};

export const setDianosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSESLIST',
    payload: diagnoses
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    id: id,
    payload: entry
  };
};



export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENTDETAILS":
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSESLIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const patient = { ...state.patientsDetails[action.id] };
      const updatedPatient = {
        ...patient,
        entries: [...patient.entries, action.payload]
      }
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.id]: updatedPatient
        }
      };
    default:
      return state;
  }
};
