import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";


const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetails }, dispatch] = useStateValue();

  useEffect(() => {
    if (Object.keys(patientsDetails).includes(id)) {
      return
    }

    const fetchPatient = async () => {
      try {
        const { data: patientsDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("in useEffect: ", patientsDetails)
        dispatch({ type: "SET_PATIENTDETAILS", payload: patientsDetails });
      } catch (e) {
        console.log(e)
      }
    }
    fetchPatient();

  }, [dispatch, id])


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
    </div>
  )
}

export default PatientDetailsPage
