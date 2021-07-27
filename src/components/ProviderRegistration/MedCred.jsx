function MedCred () {
    return(
        <div>
          

           {/* medCred multi row form component goes here, along with submit button, included in that component */}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default MedCred


// ## Checklist

// - [ ]  Inputs
//     - [ ]  licensing board
//     - [ ]  date inital
//     - [ ]  date renewed
//     - [ ]  date expiring
//     - [ ]  cert name / taxonomy
//     - [ ]  license number
//     - [ ]  button to add new license
//     - [ ]  PDF upload
// - [ ]  Stepper

// - [ ]  Next button → insurance

// ## Components

// - [ ]  credential form component - this contains inputs for credentials, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table
// - [ ]  post route to education history table
// - [ ]  post to amazon s3 type: credential pdf