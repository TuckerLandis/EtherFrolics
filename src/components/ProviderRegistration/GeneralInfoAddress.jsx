import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { TextField, Typography } from "@material-ui/core";
import RegistrationStepper from './Stepper'

function GeneralInfoAddress() {

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
            payload: {
                streetAddress: streetAddress,
                city: city,
                state: state,
                zip: zip,
                phone: phone
            }
        })

        history.push('/workhistory')
    }

    function handleChange(e) {
        switch (e.target.id) {
            case 'streetAddressInput':
                setStreetAddress(e.target.value)
                break
            case 'cityInput':
                setCity(e.target.value)
                break
            case 'stateInput':
                setState(e.target.value)
                break
            case 'zipInput':
                setZip(e.target.value)
                break
            case 'phoneInput':
                setPhone(e.target.value)
        }
      
    }

    const activeStep = 1

    return (
        <div>
            <Typography variant="h4" className="registration-title">Contact Info</Typography>
            <div className="general-form-display">

                <form onSubmit={handleNext}>
                    {/* <div className="general-form-sub-display"> */}

                    <div className="text-field-wrapper">
                        {/* <label htmlFor="phoneInput">Phone Number</label> */}
                        <TextField label="Phone Number" variant="outlined" required type="text" name="phone" id="phoneInput" value={phone} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="streetAddressInput">Street Address</label> */}
                        <TextField label="Street Address" variant="outlined" required type="text" name="streetAddress" id="streetAddressInput" value={streetAddress} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="cityInput">City</label> */}
                        <TextField label="City" variant="outlined" required type="text" name="city" id="cityInput" value={city} onChange={handleChange} />
                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="stateInput">State</label> */}
                        <TextField label="State" variant="outlined" required type="text" name="state" id="stateInput" value={state} onChange={handleChange} />

                    </div>
                    <div className="text-field-wrapper">
                        {/* <label htmlFor="zipInput">Zip Code</label> */}
                        <TextField label="Zip Code" variant="outlined" required type="text" name="zip" id="zipInput" value={zip} onChange={handleChange} />
                    </div>
                    {/* <button disabled={!addressFormComplete ? true : false} type="submit">Next</button> */}


                    {/* </div> */}



                    <RegistrationStepper activeStep={activeStep} />

                </form>


                {/* stepper goes here with props of which page */}

            </div>

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