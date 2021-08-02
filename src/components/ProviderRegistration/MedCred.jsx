import MedCredMultiRow from './FormComponents/MedCredMultiRow';
import { useState } from "react";
import { useHistory } from "react-router";

import Button from '@material-ui/core/Button';

function MedCred () {

  const history = useHistory();

  const [credentialList, setCredentialList] = useState([1]);

  // state variable to track if at least 1 section
  // of credential data has been submitted to the DB
  const [credentialSubmitted, setCredentialSubmitted] = useState(false);

  const addCredentialHistoryData = () => {

    setCredentialList(amountOfWorkHistories =>
      [...amountOfWorkHistories, amountOfWorkHistories.length + 1]);

      // credential submitted becoming true enables next button
      setCredentialSubmitted(true);

  };

  const handleNext = () => {

    console.log('handle next');
    if (credentialList.length > 1) {
      history.push('/insurance')  
    } else {
      return alert('Please enter in all valid credentials');
    }
      
  };

  console.log(credentialList);

  return(
      <div>
          

      {/* medCred multi row form component goes here, along with submit button, included in that component */}
      {credentialList.map(credential => {
        return (
          <MedCredMultiRow key={credential} addCredentialHistoryData={addCredentialHistoryData} />
        )
      })}
      
      {/* next button goes here */}
      <Button disabled={!credentialSubmitted ? true : false} onClick={handleNext} color="primary" variant="outlined">Next</Button>
      {/* stepper goes here with props of which page */}

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