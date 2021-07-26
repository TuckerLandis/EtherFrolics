function MissionHistory () {
    return(
        <div>
            <label htmlFor="lastMissionInput">When was your last mission trip?</label>
            <select name="lastMission" id="lastMissionInput" >
                <option value="1">Within the last year</option>
                <option value="2">Within the last 2 years</option>
                <option value="3">Within the last 3 years</option>
                <option value="4">Within the last 4 years</option>
                <option value="5">Within the last 5 years</option>
                <option value="6">More than 5 years ago</option>
                </select>

           {/* mission history multi row form component goes here, along with submit button, included in that component */}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default MissionHistory




// ## Checklist


// - [ ]  inputs
//     - [ ]  last mission - dropdown
//     - [ ]  organization
//     - [ ]  location
//     - [ ]  reference
//     - [ ]  reference contact
//     - [ ]  start date
//     - [ ]  end date
//     - [ ]  button to add mission form
// - [ ]  PDF upload
// - [ ]  Next button → education

// ## Components

// - [ ]  mission history form component - this contains inputs for mission history, gets duplicated by + button
// - [ ]  header, stepper
// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table
// - [ ]  post route to mission history table
// - [ ]  post to amazon s3 type: missionHistory