function GeneralInfoAddress () {
    return(
        <div>
            <label htmlFor="streetAddressInput">Street Address</label>
            <TextField type="text" name="streetAddress" id="streetAddressInput" />

            <label htmlFor="cityInput">City</label>
            <TextField type="text" name="city" id="cityInput" />

            <label htmlFor="stateInput">State</label>
            <TextField type="text" name="state" id="stateInput" />

            <label htmlFor="zipInput">Zip Code</label>
            <TextField type="text" name="zip" id="zipInput" />

            {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default GeneralInfoAddress



// ## Checklist

// - [ ]  Input fields
//     - [ ]  street address
//     - [ ]  city
//     - [ ]  state
//     - [ ]  zip
// - [ ]  next button → work history

// ## Components

// - [ ]  bringing in stepper
// - [ ]  bringing in header
// - [ ]  form container -

// ## Routes

// - [ ]  put route to provider table