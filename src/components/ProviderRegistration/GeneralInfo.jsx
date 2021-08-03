import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { TextField, Typography, Select, MenuItem } from "@material-ui/core"
import RegistrationStepper from './Stepper'


function GeneralInfo() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [providerRole, setProviderRole] = useState('')
    const [validPassport, setValidPassport] = useState(false)
    const [soleProvider, setSoleProvider] = useState(false)
    const [emailAddress, setEmailAddress] = useState('')

    // state variable to track if all inputs
    // have content
    const [generalInfoFormComplete, setGeneralInfoFormComplete] = useState(false);

    /**
     * Takes in an event from all inputs, changes their state variable
     * @param {*} e 
     */
    function handleChange(e) {

        // function for validation


        console.log(e.target.id);

        switch (e.target.id) {
            case 'firstNameInput':
                setFirstName(e.target.value)
                break
            case 'lastNameInput':
                setLastName(e.target.value)
                break
            case 'dateOfBirthInput':
                setDob(e.target.value)
                break
            case 'providerRoleInput':
                setProviderRole(e.target.value)
                break
            case "validPassportRadioTrue":
                setValidPassport(true)
                break
            case "validPassportRadioFalse":
                setValidPassport(false)
                break
            case "soleProviderRadioTrue":
                setSoleProvider(true)
                break
            case "soleProviderRadioFalse":
                setSoleProvider(false)
                break
            case "emailAddressInput":
                setEmailAddress(e.target.value)
                break
        }

        if (firstName != '' && lastName != '' && dob != '' && providerRole != '' && validPassport != '' && soleProvider != '' && emailAddress != '') {
            console.log('in if');
            setGeneralInfoFormComplete(true);
        } else {
            console.log('in else');
            setGeneralInfoFormComplete(false);
        }
    }

    /**
     * Upon clicking next button, validate forms, bundle info, send dispatch, push to next page
     */
    function handleNext(e) {
        e.preventDefault()

        // TODO - form validation goes here

        console.log('next clicked');

        const newProviderGeneralInfo = {
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            providerRole: providerRole,
            validPassport: validPassport,
            soleProvider: soleProvider,
            providerEmail: emailAddress
        }

        dispatch({
            type: 'POST_PROVIDER_GENERAL',
            payload: newProviderGeneralInfo
            // saga, key oncomplete - do history.push
        })



        history.push('/generalinfoaddress')
    }

    const activeStep = 0


    return (
        <div>
            <Typography variant="h4" className="registration-title">General Info</Typography>

            <RegistrationStepper activeStep={activeStep} submitFunction={handleNext} />

            <div className="general-form-display">



                {/* wrapped in form tag for error validation, there is a much prettier way to do this in mui */}
                <form onSubmit={handleNext}>
                    {/* <label htmlFor="firstNameInput">First Name</label> */}


                    <div className="general-form-sub-display">

                        <div className="text-field-wrapper">
                            <TextField label="First Name" required type="text" name="firstName" id="firstNameInput"
                                value={firstName} onChange={handleChange} variant="outlined" />

                        </div>


                        <div className="text-field-wrapper">
                            {/* <label htmlFor="lastNameInput">Last Name</label> */}
                            <TextField label="Last Name" required type="text" name="lastName" id="lastNameInput"
                                value={lastName} onChange={handleChange} variant="outlined" />


                        </div>


                        <div className="text-field-wrapper">
                            <TextField required type="date" name="dateOfBirth" id="dateOfBirthInput"
                                label="Date Of Birth" InputLabelProps={{ shrink: true }}
                                value={dob} onChange={handleChange} variant="outlined" />


                        </div>
                        {/* <label htmlFor="dateOfBirthInput">Date of Birth</label> */}

                        <div className="text-field-wrapper">
                            <TextField label="Email Address" required type="text" id="emailAddressInput" value={emailAddress}
                                onChange={handleChange} variant="outlined" />
                        </div>



                    </div>


                    {/* <KeyboardDatePicker
                    margin="normal"
                    id="dateOfBirthInput"
                    label="Date of Birth"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                /> */}


                    <Typography htmlFor="providerRoleInput">Provider Role</Typography>
                    <Select variant="outlined" name="providerRole" id="providerRoleInput" value={providerRole} onChange={handleChange}>
                        <MenuItem value="-">-</MenuItem>
                        <MenuItem value="CRNA">CRNA</MenuItem>

                        {/* need more options here */}
                    </Select>



                    <Typography variant="body1">Do you have a valid passport?</Typography>
                    <label htmlFor="yes">Yes</label>
                    <input required type="radio" name="validPassport" id="validPassportRadioTrue" value="true" onChange={handleChange} />
                    <label htmlFor="no">No</label>
                    <input type="radio" name="validPassport" id="validPassportRadioFalse" value="false" onChange={handleChange} />


                    <Typography variant="body1">Are you comfortable working as a sole provider?</Typography>
                    <label htmlFor="yes">Yes</label>
                    <input required type="radio" name="soleProvider" id="soleProviderRadioTrue" value="true" onChange={handleChange} />
                    <label htmlFor="no">No</label>
                    <input type="radio" name="soleProvider" id="soleProviderRadioFalse" value="false" onChange={handleChange} />




                    {/* <label htmlFor="emailAdressInput">Email Address</label> */}


                    {/* <button disabled={!generalInfoFormComplete ? true : false} type="submit">Next</button> */}



                </form>






            </div>


        </div>

    )
}


export default GeneralInfo

// submitFunction={handleNext}


// ## Checklist

// - [x]  Input fields
//     - [x]  Name
//     - [x]  DOB
//     - [x]  Provider role
//     - [x]  sole provider checkbox
//     - [x]  valid passport checkbox
//     - [x]  opt -in recruiters checkbox
//     - [x]  next button
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