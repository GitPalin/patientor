import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants';
import { setPatientDetails, useStateValue } from '../state';
import { Patient } from "../types";
import { Card, Icon } from "semantic-ui-react";
import EntryDetails from '../components/EntryDetails';


const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetails, diagnoses }, dispatch] = useStateValue();

  useEffect(() => {
    if (Object.keys(patientsDetails).includes(id)) {
      return
    }

    const fetchPatient = async () => {
      try {
        const { data: patientsDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // console.log("in useEffect: ", patientsDetails)
        // console.log("in useEffect: ", patientsDetails.entries)
        dispatch(setPatientDetails(patientsDetails));
      } catch (e) {
        console.log(e)
      }
    }
    fetchPatient();

  }, [dispatch, id, patientsDetails])


  return (
    <div>
      <h3>{patientsDetails[id]?.name} {
        patientsDetails[id]?.gender === "female" ? <Icon name="venus" />
          :
          patientsDetails[id]?.gender === "male" ? <Icon name="mars" />
            : <Icon name="genderless" />
      }</h3>
      <p>ssn: {patientsDetails[id]?.ssn}</p>
      <p>occupation: {patientsDetails[id]?.occupation}</p>
      <h3>Entries</h3>
      { patientsDetails[id]?.entries?.map((entry) => (
        <Card key={entry.id} style={{ padding: 10 }}>
          <EntryDetails entry={entry} />
          <ul>
            {entry?.diagnosisCodes?.map(code => (
              <li key={code}>{code}  {diagnoses[code]?.name}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}

export default PatientDetailsPage
