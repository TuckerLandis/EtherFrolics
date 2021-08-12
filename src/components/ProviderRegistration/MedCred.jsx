import MedCredMultiRow from './FormComponents/MedCredMultiRow';
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import RegistrationStepper from './Stepper'
import { Typography } from '@material-ui/core';

function MedCred () {

  const history = useHistory();

  // useSelector for provider creds, can be used to render here after add, before submit
  const providerCredentials = useSelector(store => store.credentialHistoryReducer)

  const dispatch = useDispatch();

  // amount of credentials array, to render more forms
  const [credentialList, setCredentialList] = useState([1]);

  const addCredentialHistoryData = () => {

    setCredentialList(amountOfCredentials =>
      [...amountOfCredentials, amountOfCredentials.length + 1]);

  };

  // passed down as props to stepper
  const handleNext = () => {

    dispatch({
      type: 'ADD_CREDENTIAL_HISTORY_DATA',
      payload: providerCredentials
    });

    history.push('/insurance') 
  };

  // passed down as props to stepper to render progress bar
  const activeStep = 6

  return(
      <div>
        <Typography variant="h4" className="registration-title">Medical Credentials</Typography>
        <hr></hr>
          

      {/* medCred multi row form component goes here, along with submit button, included in that component */}
      {credentialList.map((credential,i) => {
        return (
          <MedCredMultiRow key={i} addCredentialHistoryData={addCredentialHistoryData} />
        )
      })}
      
      < RegistrationStepper activeStep={activeStep} submitFunction={handleNext}/>

      </div>
    )
}


export default MedCred

