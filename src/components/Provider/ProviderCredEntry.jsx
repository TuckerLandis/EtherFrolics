import React, { useState } from 'react';
import { TextField, Typography, Button } from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ImageUploader from '../ImageComponents/ImageUploader';

function ProviderCredEntry({ entryType, provider, credentialEntry, inputConfig }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [credUpdate, setCredUpdate] = useState({
    credentialTaxonomy: credentialEntry.credentialName,
    licensingBoard: credentialEntry.licensingBoard,
    licenseNumber: credentialEntry.licenseNumber,
    dateReceived: credentialEntry.dateInitial,
    dateRenewed: credentialEntry.dateRenewed, 
    dateExpired: credentialEntry.dateExpiring,
    table: 'credential',
    credentialImageKey: credentialEntry.credentialImageKey,
    credentialId: credentialEntry?.credential_id,
    userId: provider.id
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

    if (entryType === 'edit'){
      
      dispatch({
        type: 'UPDATE_PROVIDER',
        payload: credUpdate
      })

      dispatch({
        type: 'RESET_CREDENTIAL_ENTRY',
        payload: {
            credentialName: '',
            licensingBoard: '',
            licenseNumber: '',
            dateInitial: '',
            dateRenewed: '',
            dateExpiring: '',
            credentialImageKey: ''
        }
      })
  
      history.push('/providerlandingpage')

    } else {
      if (
        credUpdate.credentialTaxonomy != '' 
        && credUpdate.licensingBoard != ''
        && credUpdate.licenseNumber != ''
        && credUpdate.dateReceived != ''
        && credUpdate.dateRenewed != ''
        && credUpdate.dateExpired != ''
        && credUpdate.credentialImageKey != ''
        ) {
          dispatch({
            type: 'ADD_CREDENTIAL_HISTORY_DATA',
            payload: [credUpdate]
          })

          dispatch({
            type: 'RESET_CREDENTIAL_ENTRY',
            payload: {
                credentialName: '',
                licensingBoard: '',
                licenseNumber: '',
                dateInitial: '',
                dateRenewed: '',
                dateExpiring: '',
                credentialImageKey: ''
            }
          })
      
          history.push('/providerlandingpage')

      } else {
        alert('One or more TextFields requires more information before submission.')
      }
    }
  }

  const validateProps = credentialEntry => {
    if (credentialEntry.credential_id) {
      return credentialEntry.credentialName
    } else {
      return history.push('/providerlandingpage/add')
    }
  }

  const handleImageAttach = (awsKey) => {
    setCredUpdate({
      ...credUpdate,
      credentialImageKey: awsKey
    })
  }

  const cancelEdit = e => {
    history.push('/providerlandingpage')
  }

  return (
    <div>
      {entryType === 'edit' ?
        <Typography variant="h6" className="registration-title">
        Update Credential: {validateProps(credentialEntry)}
        </Typography>
      :
        <Typography variant="h6" className="registration-title">
        Add New Credential
        </Typography>
      }

      <div className="general-form-display" >

        <form onSubmit={sendUpdate} >
          <div className="text-field-wrapper">
            <ImageUploader attachImageFunction={handleImageAttach} />
          </div>
          {inputConfig.map((config, i) => {
            return(
              <div key={i} className="text-field-wrapper">
                <TextField required InputLabelProps={config.inputType === 'date' ? { shrink: true } : null} type={config.inputType} label={config.inputLabel} variant="outlined" name={config.inputName} value={credUpdate[config.inputName]} onChange={handleChange} />
              </div>
            )
            
          })}

          {entryType === 'edit' ?
            <div className="text-field-wrapper">
              <Button type="submit" color="primary" size="large" variant="contained" >Save Changes</Button>  
            </div>
          :
            <div className="text-field-wrapper">
              <Button type="submit" color="primary" size="large" variant="contained" >Add Credential</Button>  
            </div>
          }

          <div className="text-field-wrapper">
            <Button color="secondary" size="large" variant="contained" onClick={cancelEdit} >Cancel</Button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default ProviderCredEntry;