import MedCredMultiRow from './FormComponents/MedCredMultiRow';
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import RegistrationStepper from './Stepper'
import { Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';

function MedCred () {

  const history = useHistory();

  const providerCredentials = useSelector(store => store.credentialHistoryReducer)

  const dispatch = useDispatch();

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

  const handleNext = () => {

    console.log('handle next');

    dispatch({
      type: 'ADD_CREDENTIAL_HISTORY_DATA',
      payload: providerCredentials
    });

    history.push('/insurance') 
  };

  console.log(credentialList);

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
      
      {/* next button goes here */}
      {/* <Button disabled={!credentialSubmitted ? true : false} onClick={handleNext} color="primary" variant="outlined">Next</Button> */}
      {/* stepper goes here with props of which page */}

      < RegistrationStepper activeStep={activeStep} submitFunction={handleNext}/>

      </div>
    )
}


export default MedCred


// ## Checklist

// - [ ]  Inputs
//     - [x]  licensing board
//     - [x]  date inital
//     - [x]  date renewed
//     - [x]  date expiring
//     - [x]  cert name / taxonomy
//     - [x]  license number
//     - [x]  button to add new license
//     - [ ]  PDF upload
// - [ ]  Stepper

// - [x]  Next button → insurance

// ## Components

// - [x]  credential form component - this contains inputs for credentials, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table
// - [ ]  post route to education history table
// - [ ]  post to amazon s3 type: credential pdf