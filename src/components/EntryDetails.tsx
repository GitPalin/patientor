import React from 'react'
import { Header, Icon } from 'semantic-ui-react';
import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from '../types'

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    case "Hospital":
      return <Hospital entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />

    default:
      return assertNever(entry);
  }
}


const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h3">{entry.date} <Icon name="user md" /></Header>
      <p>{entry.description}</p>
      {entry.healthCheckRating === 3 && (<Icon name="heart" color="red" />)}
      {entry.healthCheckRating === 2 && (<Icon name="heart" color="orange" />)}
      {entry.healthCheckRating === 1 && (<Icon name="heart" color="yellow" />)}
      {entry.healthCheckRating === 0 && (<Icon name="heart" color="green" />)}
    </div>
  )
}

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h3">{entry.date} <Icon name="hospital" /></Header>
      <p>{entry.description}</p>
    </div>
  )
}

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h3">{entry.date} <Icon name="plus square" /></Header>
      <p>{entry.description}</p>
    </div>
  )
}

export default EntryDetails
