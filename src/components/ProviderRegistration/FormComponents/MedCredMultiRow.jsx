import React, { useState } from 'react';

import { TextField } from "@material-ui/core"
import Button from '@material-ui/core/Button';

import { useDispatch } from "react-redux"

function MedCredMultiRow(props) {

  const dispatch = useDispatch();

  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const credentialTextInputConfig = [
    {
      inputLabel: 'Licensing Board',
      inputName: 'licensingBoard'
    },
    {
      inputLabel: 'Credential Taxonomy',
      inputName: 'credentialTaxonomy'
    },
    {
      inputLabel: 'License Number',
      inputName: 'licenseNumber'
    }
  ]

  const credentialDateInputConfig = [
    {
      inputLabel: 'Date Received',
      inputName: 'dateReceived'
    },
    {
      inputLabel: 'Date Renewed',
      inputName: 'dateRenewed'
    },
    {
      inputLabel: 'Date Expired',
      inputName: 'dateExpired'
    }
  ];
  
  const [medCredValues, setMedCredValues] = useState({
      licensingBoard: '',
      credentialTaxonomy: '',
      liscenseNumber: '',
      dateReceived: '',
      dateRenewed: '',
      dateExpired: '',
  });

  const submitCredentialHistory = e => {

    e.preventDefault();

    console.log('submitting history');

    setHasBeenSubmitted(true);

    dispatch({
      type: 'ADD_CREDENTIAL_HISTORY_DATA',
      payload: medCredValues  
    });

    props.addCredentialHistoryData();
  };

  const handleChange = e => {

    e.preventDefault();

    console.log(e.target.name, e.target.value);

    setMedCredValues({
      ...medCredValues,
      [e.target.name]: e.target.value  
    });

  }

  console.log(medCredValues);
  return (
    <div>
      <form onSubmit={submitCredentialHistory}>
      
        {credentialTextInputConfig.map((textInputConfig, i) => {
          return (
              <TextField key={i} required label={textInputConfig.inputLabel} variant="outlined" name={textInputConfig.inputName} value={medCredValues[textInputConfig.inputName]} onChange={handleChange} />
          )
        })}

        {credentialDateInputConfig.map((dateInputConfig, i) => {
          return (
              <TextField key={i} required type="date" label={dateInputConfig.inputLabel} InputLabelProps={{ shrink: true }} variant="outlined" name={dateInputConfig.inputName} value={medCredValues[dateInputConfig.inputName]} onChange={handleChange} />
          )
        })}
        
        {hasBeenSubmitted ? (
            <p>submitted</p>
          ) : (
                
            <Button type="submit" size="small" color="secondary" variant="contained">+</Button>
          )}
      </form>
    </div>
  );
}

export default MedCredMultiRow;