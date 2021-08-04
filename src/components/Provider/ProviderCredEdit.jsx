import React, { useState } from 'react';
import { TextField, Typography, Button } from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ProviderCredEdit({ provider, credentialEntry, inputConfig }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [credUpdate, setCredUpdate] = useState({
    credentialTaxonomy: credentialEntry.credentialName,
    licensingBoard: credentialEntry.licensingBoard,
    licenseNumber: credentialEntry.licenseNumber,
    dateReceived: credentialEntry.dateInitial,
    dateRenewed: credentialEntry.dateRenewed, 
    dateExpired: credentialEntry.dateExpiring,
    user_id: provider.user_id
  })

  const handleChange = e => {

    e.preventDefault();

    setCredUpdate({
      ...credUpdate,
      [e.target.name]: e.target.value
    });
  }

  const sendUpdate = e => {

    e.preventDefault();

    dispatch({
      type: 'SUBMIT_CREDENTIAL_UPDATE',
      payload: credUpdate
    })
  }

  const validateProps = credentialEntry => {
    if (credentialEntry.credential_id) {
      return credentialEntry.credentialName
    } else {
      return history.push('/providerlandingpage/add')
    }
  }

  console.log(credUpdate);
  return (
    <div>
      <Typography variant="h6" className="registration-title">
       Update Credential: {validateProps(credentialEntry)}
      </Typography>
      <div className="general-form-display" >
        <form onSubmit={sendUpdate} >
          {inputConfig.map((config, i) => {
            return(
              <div key={i} className="text-field-wrapper">
                <TextField required InputLabelProps={config.inputType === 'date' ? { shrink: true } : null} type={config.inputType} label={config.inputLabel} variant="outlined" name={config.inputName} value={credUpdate[config.inputName]} onChange={handleChange} />
              </div>
            )
            
          })}
          <div className="text-field-wrapper">
            <Button type="submit" color="primary" >Save</Button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default ProviderCredEdit;