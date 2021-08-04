import React, { useState } from 'react';
import { TextField, Typography } from "@material-ui/core"

function ProviderCredEdit({ provider, credentialEntry, inputConfig }) {

  const [credUpdate, setCredUpdate] = useState({
    credentialTaxonomy: credentialEntry.credentialName,
    licensingBoard: credentialEntry.licensingBoard,
    licenseNumber: credentialEntry.licenseNumber,
    dateReceived: credentialEntry.dateInitial,
    dateRenewed: credentialEntry.dateRenewed, 
    dateExpired: credentialEntry.dateExpiring
  })

  const handleChange = e => {

    e.preventDefault();

    setCredUpdate({
      ...credUpdate,
      [e.target.name]: e.target.value
    });
  }

  console.log(credUpdate);
  return (
    <div>
      <Typography variant="h6" className="registration-title">
       Update Credential: {credentialEntry.credentialName}
      </Typography>
      <div className="general-form-display" >
        <form>
          {inputConfig.map((config, i) => {
            return(
              <div key={i} className="text-field-wrapper">
                <TextField required InputLabelProps={config.inputType === 'date' ? { shrink: true } : null} type={config.inputType} label={config.inputLabel} variant="outlined" name={config.inputName} value={credUpdate[config.inputName]} onChange={handleChange} />
              </div>
            )
            
          })}
        </form>
      </div>
    </div>

  );
}

export default ProviderCredEdit;