import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"



function GeneralInfo () {
    const dispatch = useDispatch()
    const history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [providerRole, setProviderRole] = useState('')
    const [validPassport, setValidPassport] = useState(false)
    const [soleProvider, setSoleProvider] = useState(false)

    function handleChange (e) {
        // switch on evt.target.id to set specific states

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
            setValidPassport(true)
            break
            case "soleProviderRadioFalse" :
            setValidPassport(false)
            break

        }
    }


    function handleNext () {
        // triggers submit function
        // triggers history push to address
        console.log('next clicked');



        // history.push('/generalinfoaddress') // works, commenting out for testing submit

    }

    return(
        <div>
            <label htmlFor="firstNameInput">First Name</label>
            <input type="text" name="firstName" id="firstNameInput" value={firstName} onChange={handleChange}/>

            <label htmlFor="lastNameInput">Last Name</label>
            <input type="text" name="lastName" id="lastNameInput" value={lastName} onChange={handleChange}/>

            <label htmlFor="dateOfBirthInput">Date of Birth</label>
            <input type="date" name="dateOfBirth" id="dateOfBirthInput" value={dob} onChange={handleChange}/>


            <label htmlFor="providerRoleInput">Provider Role</label>
            <select name="providerRole" id="providerRoleInput" value={providerRole} onChange={handleChange}>
            <option value="CRNA">CRNA</option>

                {/* need more options here */}
                </select>


            {/* need to figure out how to do this with the switch statement / not*/}
            <p>Do you have a valid passport?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="validPassport" id="validPassportRadioTrue" value="true" onChange={handleChange}/>
            <label htmlFor="no">No</label>
            <input type="radio" name="validPassport" id="validPassportRadioFalse" value="false" onChange={handleChange}/>

            {/* need to figure out how to do this with the switch statement / not*/}

            <p>Are you comfrotable working as a sole provider?</p>
            <label htmlFor="yes">Yes</label>
            <input type="radio" name="soleProvider" id="soleProviderRadioTrue" value="true" onChange={handleChange}/>
            <label htmlFor="no">No</label>
            <input type="radio" name="soleProvider" id="soleProviderRadioFalse" value="false"  onChange={handleChange}/>

            {/* next button goes here */}
            <button onClick={handleNext}>Next</button>

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