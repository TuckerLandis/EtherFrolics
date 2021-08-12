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

    /**
     * Passed down to the stepper component as props to be called upon pressing the next button
     * @param {*} e 
     */
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
        // sends user to next page
        history.push('/workhistory')
    }

    /**
     * Takes in events, changes state variables accordingly
     * @param {*} e 
     */
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

    // passed down to stepper for rendering progress bar
    const activeStep = 1

    return (
        <div>
            <Typography variant="h4" className="registration-title">Contact Info</Typography>
            <hr></hr>
            <div className="general-form-display">

                <form onSubmit={handleNext}>
                   

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
                    


                    



                    <RegistrationStepper activeStep={activeStep} />

                </form>


                {/* stepper goes here with props of which page */}

            </div>

        </div>

    )
}


export default GeneralInfoAddress

