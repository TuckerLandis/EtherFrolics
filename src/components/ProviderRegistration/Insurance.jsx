function Insurance () {
    return(
        <div>
          <p>Insurance</p>

           {/* insurance multi row form component goes here, along with submit button, included in that component */}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default Insurance


// ## Checklist

// - [ ]  inputs
//     - [ ]  insurance provider
//     - [ ]  policy number
//     - [ ]  state
//     - [ ]  date issued
//     - [ ]  date renewed
//     - [ ]  date expiring
//     - [ ]  button for adding a policy,
//     - [ ]  PDF upload for insurance

// - [ ]  stepper

// - [ ]  submit button !!

// ## Components

// - [ ]  insurance form component - this contains inputs for insurance, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table  ?
// - [ ]  post route to insurance table
// - [ ]  post to amazon s3 type: insurance