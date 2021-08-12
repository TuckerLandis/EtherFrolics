import React, { useState } from 'react';

import { TextField, Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';

import { useDispatch } from "react-redux"
import ImageUploader from '../../ImageComponents/ImageUploader';

function MedCredMultiRow(props) {

  const dispatch = useDispatch();

  const [itemSubmit, setItemSubmit] = useState(false);

  function handleImageAttach(awsKey) {
    setMedCredValues(
      { ...medCredValues , credentialImageKey: awsKey }
      )
}

  const credentialTextInputConfig = [
    {
      inputLabel: 'Licensing Board',
      inputName: 'licensingBoard'
    },
    {
      inputLabel: 'Credential Taxonomy (NPI#)',
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
      licenseNumber: '',
      dateReceived: '',
      dateRenewed: '',
      dateExpired: '',
      credentialImageKey: ''
  });

  const submitCredentialHistory = (e) => {

    event.preventDefault();

    setItemSubmit(true);

    dispatch({
      type: 'ADD_CREDENTIAL_OBJECT',
      payload: medCredValues
    });

    props.addCredentialHistoryData();
  };

  const handleChange = e => {

    e.preventDefault();

    setMedCredValues({
      ...medCredValues,
      [e.target.name]: e.target.value  
    });

  }

  const imageType = 'credential'

  return (
    <div className="general-form-display">
      {itemSubmit ? (
            <Typography variant="body1">Submitted!</Typography>
          ) : (
      <form onSubmit={submitCredentialHistory}>

      
        {credentialTextInputConfig.map((textInputConfig, i) => {
          return (

            <div className="text-field-wrapper">
              <TextField key={i} required label={textInputConfig.inputLabel} variant="outlined" name={textInputConfig.inputName} value={medCredValues[textInputConfig.inputName]} onChange={handleChange} 
              />

            </div>
          )
        })}
      
      
        {credentialDateInputConfig.map((dateInputConfig, i) => {
          return (

            <div className="text-field-wrapper">
              <TextField key={i} required type="date" label={dateInputConfig.inputLabel} InputLabelProps={{ shrink: true }} variant="outlined" name={dateInputConfig.inputName} value={medCredValues[dateInputConfig.inputName]} onChange={handleChange} />
            </div>
          )
        })}

          <ImageUploader imageType={imageType} attachImageFunction={handleImageAttach}/>
        
        
            <div className="text-field-wrapper">
              <Button variant="contained" color="secondary" type="submit">Add Medical Credential +</Button>
            </div>
          
      </form>
      )}
    </div>
  );
}

export default MedCredMultiRow;