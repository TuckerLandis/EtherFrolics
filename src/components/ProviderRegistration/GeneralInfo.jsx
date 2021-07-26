function GeneralInfo () {
    return(
        <div>
            <label htmlFor="firstNameInput">First Name</label>
            <input type="text" name="firstName" id="firstNameInput" />

            <label htmlFor="lastNameInput">Last Name</label>
            <input type="text" name="lastName" id="lastNameInput" />

            <label htmlFor="dateOfBirthInput">Date of Birth</label>
            <input type="date" name="dateOfBirth" id="dateOfBirthInput" />


            <label htmlFor="providerRoleInput">Provider Role</label>
            <select name="providerRole" id="providerRoleInput">
            <option value="CRNA">CRNA</option>

                {/* need more options here */}
                </select>

            <p>Do you have a valid passport?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="validPassport" value="yes" />
            <label htmlFor="no">No</label>
            <input type="radio" name="validPassport" value="no" />

            <p>Are you comfrotable working as a sole provider?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="soleProvider" value="yes" />
            <label htmlFor="no">No</label>
            <input type="radio" name="soleProvider" value="no" />

            {/* next button goes here */}

            {/* stepper goes here with props of which page */}


            
        </div>
    )
}


export default GeneralInfo



// ## Checklist

// - [ ]  Input fields
//     - [ ]  Name
//     - [ ]  DOB
//     - [ ]  Provider role
//     - [ ]  sole provider checkbox
//     - [ ]  valid passport checkbox
//     - [ ]  opt -in recruiters checkbox
//     - [ ]  next button
//     - [ ]  steppers specific - separate component - url params
// - [ ]  divs - structure
//     - [ ]  
//     - [ ]  
// - [ ]  write post route

// ## Components

// - [ ]  bringing in stepper
// - [ ]  header
// - [ ]  form container - structure, div type stuff
//     - [ ]  inputs

// ## Routes

// - [ ]  post - provider table