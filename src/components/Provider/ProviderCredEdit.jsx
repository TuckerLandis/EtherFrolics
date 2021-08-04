import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

function ProviderCredEdit({ provider, credentialEntry }) {

  console.log(credentialEntry);
  return (
    <div className="general-form-display" >
      <Typography variant="h4">
       Update Credential:
      </Typography>
    </div>
  );
}

export default ProviderCredEdit;