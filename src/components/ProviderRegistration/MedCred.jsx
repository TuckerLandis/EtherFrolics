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

  // state variable to track if at least 1 section
  // of credential data has been submitted to the DB
  const [credentialSubmitted, setCredentialSubmitted] = useState(false);

  const addCredentialHistoryData = () => {

    setCredentialList(amountOfCredentials =>
      [...amountOfCredentials, amountOfCredentials.length + 1]);

      // credential submitted becoming true enables next button
      setCredentialSubmitted(true);

  };

  // passed down as props to stepper
  const handleNext = () => {

    console.log('handle next');

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
      {credentialList.map(credential => {
        return (
          <MedCredMultiRow key={credential} addCredentialHistoryData={addCredentialHistoryData} />
        )
      })}
      
      < RegistrationStepper activeStep={activeStep} submitFunction={handleNext}/>

      </div>
    )
}


export default MedCred

