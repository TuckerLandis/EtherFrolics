import React, { useState } from 'react';

import { TextField } from "@material-ui/core"
import Button from '@material-ui/core/Button';

import { useDispatch } from "react-redux"

function TemplateFunction(props) {

  const dispatch = useDispatch();

  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  
  const [medCredValues, setMedCredValues] = useState({
      licensingBoard: '',
      credentialTaxonomy: '',
      liscenseNumber: '',
      dateRecieved: '',
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

  const setValue = (inputLabel) => {

    const labelArray = inputLabel.split(' ');

    if (labelArray.length === 2) {

      const variableNamePartOne = labelArray[0].toLowerCase();

      return medCredValues[variableNamePartOne + labelArray[1]];

    } else {

      const variableNamePartOne = labelArray[0].toLowerCase();
      
      return medCredValues[variableNamePartOne];
      
    };
  };

  const setName = (inputLabel) => {

    const labelArray = inputLabel.split(' ');

    if (labelArray.length === 2) {

      const variableNamePartOne = labelArray[0].toLowerCase();

      return variableNamePartOne + labelArray[1];

    } else {

      const variableNamePartOne = labelArray[0].toLowerCase();
      
      return variableNamePartOne;
      
    };
  };

  console.log(medCredValues);
  return (
    <div>
      <form onSubmit={submitCredentialHistory}>
      
        {['Licensing Board', 'Credential Taxonomy', 'Liscense Number']
        .map((dataPoint, i) => {
          return (
              <TextField key={i} required label={dataPoint} variant="outlined" name={setName(dataPoint)} value={setValue(dataPoint)} onChange={handleChange} />
          )
        })}

        {['Date Recieved', 'Date Renewed', 'Date Expired']
        .map((dataPoint, i) => {
          return (
              <TextField key={i} required type="date" label={dataPoint} InputLabelProps={{ shrink: true }} variant="outlined" name={setName(dataPoint)} value={setValue(dataPoint)} onChange={handleChange} placeholder=" " />
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

export default TemplateFunction;