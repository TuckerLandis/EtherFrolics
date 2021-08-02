import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { TextField } from "@material-ui/core";

function GeneralInfoAddress () {

    const dispatch = useDispatch();
    const history = useHistory()


    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    // state variable to track if all inputs
    // have content
    const [addressFormComplete, setAddressFormComplete] = useState(false); 

    function handleNext(e) {
        e.preventDefault()

        dispatch({
            type: 'PUT_PROVIDER_ADDRESS',
            payload : {
                streetAddress : streetAddress,
                city : city,
                state : state,
                zip : zip,
                phone: phone
            }
        })

        // history.push('/workhistory')
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
            case 'phoneInput' :
            setPhone(e.target.value)
        }
        if (streetAddress != '' && city != '' && state != '' && zip != '' && phone !='') {
            setAddressFormComplete(true);
        } else {
            setAddressFormComplete(false)
        }
    }

    return(
        <div>

            <form onSubmit={handleNext}>

            <label htmlFor="phoneInput">Phone Number</label>
            <TextField type="text" name="phone" id="phoneInput" value={phone} onChange={handleChange}/>

            <label htmlFor="streetAddressInput">Street Address</label>
            <TextField type="text" name="streetAddress" id="streetAddressInput" value={streetAddress} onChange={handleChange} />

            <label htmlFor="cityInput">City</label>
            <TextField type="text" name="city" id="cityInput" value={city} onChange={handleChange}/>

            <label htmlFor="stateInput">State</label>
            <TextField type="text" name="state" id="stateInput" value={state} onChange={handleChange} />

            <label htmlFor="zipInput">Zip Code</label>
            <TextField type="text" name="zip" id="zipInput" value={zip} onChange={handleChange}/>

            <button disabled={!addressFormComplete ? true : false} type="submit">Next</button>

            </form>
            

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