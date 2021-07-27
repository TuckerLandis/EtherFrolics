import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { TextField } from "@material-ui/core"



function GeneralInfo () {
    const dispatch = useDispatch()
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [providerRole, setProviderRole] = useState('')
    const [validPassport, setValidPassport] = useState(false)
    const [soleProvider, setSoleProvider] = useState(false)
    const [emailAddress, setEmailAddress] = useState('')

    /**
     * Takes in an event from all inputs, changes their state variable
     * @param {*} e 
     */
    function handleChange (e) {

        console.log(e.target.id);

        switch(e.target.id){
            case 'firstNameInput' : 
            setFirstName(e.target.value)
            break
            case 'lastNameInput' : 
            setLastName(e.target.value)
            break
            case 'dateOfBirthInput' : 
            setDob(e.target.value)
            break
            case 'providerRoleInput' : 
            setProviderRole(e.target.value)
            break
            case "validPassportRadioTrue" :
            setValidPassport(true)
            break
            case "validPassportRadioFalse" :
            setValidPassport(false)
            break
            case "soleProviderRadioTrue" :
            setSoleProvider(true)
            break
            case "soleProviderRadioFalse" :
            setSoleProvider(false)
            break
            case "emailAddressInput" : 
            setEmailAddress(e.target.value)
            break
        }
    }

    /**
     * Upon clicking next button, validate forms, bundle info, send dispatch, push to next page
     */
    function handleNext () {

        // TODO - form validation goes here

        console.log('next clicked');

        const newProviderGeneralInfo = {
            firstName : firstName,
            lastName : lastName,
            dob : dob,
            providerRole : providerRole,
            validPassport : validPassport,
            soleProvider : soleProvider
        }

        dispatch({
            type: 'POST_PROVIDER_GENERAL',
            payload: newProviderGeneralInfo 
        })
        
        // history.push('/generalinfoaddress') // works, commenting out for testing submit
    }



    return(
        <div>
            <label htmlFor="firstNameInput">First Name</label>
            <TextField type="text" name="firstName" id="firstNameInput" value={firstName} onChange={handleChange}/>

            <label htmlFor="lastNameInput">Last Name</label>
            <TextField type="text" name="lastName" id="lastNameInput" value={lastName} onChange={handleChange}/>

            <label htmlFor="dateOfBirthInput">Date of Birth</label>
            <TextField type="date" name="dateOfBirth" id="dateOfBirthInput" value={dob} onChange={handleChange}/>

           
            <label htmlFor="providerRoleInput">Provider Role</label>
            <select name="providerRole" id="providerRoleInput" value={providerRole} onChange={handleChange}>
            <option value="CRNA">CRNA</option>

                {/* need more options here */}
                </select>


            
            <p>Do you have a valid passport?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="validPassport" id="validPassportRadioTrue" value="true" onChange={handleChange}/>
            <label htmlFor="no">No</label>
            <input type="radio" name="validPassport" id="validPassportRadioFalse" value="false" onChange={handleChange}/>


            <p>Are you comfortable working as a sole provider?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="soleProvider" id="soleProviderRadioTrue" value="true" onChange={handleChange}/>
            <label htmlFor="no">No</label>
            <input type="radio" name="soleProvider" id="soleProviderRadioFalse" value="false"  onChange={handleChange}/>


            <button onClick={handleNext}>Next</button>

             <label htmlFor="emailAdressInput">Email Address</label>
            <TextField type="text" id="emailAdressInput" value={emailAddress} onChange={handleChange}/>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default GeneralInfo



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