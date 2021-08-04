import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

function ProviderCredEdit({ provider }) {

  return (
    <div className="general-form-display" >
      <Typography variant="h4">
       Update Credential: {provider.credentialName}
      </Typography>
    </div>
  );
}

export default ProviderCredEdit;