import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { TextField } from "@material-ui/core";

function GeneralInfoAddress () {

    const dispatch = useDispatch();
    const history = useHistory()

    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    function handleNext() {

        dispatch({
            type: 'PUT_PROVIDER_ADDRESS',
            payload : {
                streetAddress : streetAddress,
                city : city,
                state : state,
                zip : zip,
            }
        })

        history.push('/workhistory')
    }

    function handleChange(e) {
        switch(e.target.id){
            case 'streetAddressInput' : 
            setStreetAddress(e.target.value)
            break
            case 'cityInput' : 
            setCity(e.target.value)
            break
            case 'stateInput' : 
            setState(e.target.value)
            break
            case 'zipInput' : 
            setZip(e.target.value)
            break
        }
    }

    return(
        <div>
            <label htmlFor="streetAddressInput">Street Address</label>
            <TextField type="text" name="streetAddress" id="streetAddressInput" value={streetAddress} onChange={handleChange} />

            <label htmlFor="cityInput">City</label>
            <TextField type="text" name="city" id="cityInput" value={city} onChange={handleChange}/>

            <label htmlFor="stateInput">State</label>
            <TextField type="text" name="state" id="stateInput" value={state} onChange={handleChange} />

            <label htmlFor="zipInput">Zip Code</label>
            <TextField type="text" name="zip" id="zipInput" value={zip} onChange={handleChange}/>

            <button onClick={handleNext}>Next</button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default GeneralInfoAddress



// ## Checklist

// NEXT - finish saga > route
 
// - [x ]  Input fields
//     - [ x]  street address
//     - [ x]  city
//     - [ x]  state
//     - [x ]  zip
// - [x ]  next button → work history

// ## Components

// - [ ]  bringing in stepper
// - [ ]  bringing in header
// - [ ]  form container -

// ## Routes

// - [ ]  put route to provider table