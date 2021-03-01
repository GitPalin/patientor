import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants';
import { setPatientDetails, useStateValue, addEntry } from '../state';
import { Entry, Patient } from "../types";
import { Button, Card, Icon } from "semantic-ui-react";
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';


const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetails, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  )
}

export default PatientDetailsPage
