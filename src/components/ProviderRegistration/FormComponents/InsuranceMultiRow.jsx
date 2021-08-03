import { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ImageUploader from "../../ImageComponents/ImageUploader";

// ## Checklist

// - [ ]  inputs
//     - [ ]  insurance provider
//     - [ ]  policy number
//     - [ ]  state
//     - [ ]  date issued
//     - [ ]  date renewed
//     - [ ]  date expiring
//     - [ ]  button for adding a policy,
//     - [ ]  PDF upload for insurance

// - [ ]  stepper

// - [ ]  submit button !!

// ## Components

// - [ ]  insurance form component - this contains inputs for insurance, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table  ?
// - [ ]  post route to insurance table
// - [ ]  post to amazon s3 type: insurance

function InsuranceMultiRow (props) {
    const dispatch = useDispatch();

    // create states to collect the form data
    const [insuranceType, setInsuranceType] = useState('')
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [state, setState] = useState('');
    const [dateInitial, setDateInitial] = useState('');
    const [dateRenewed, setDateRenewed] = useState('');
    const [dateExpiring, setDateExpiring] = useState('');
    const [submitted, setSubmitted] = useState(false);
    //Still need PDF upload

    const handleChange = (evt) => {
        switch (evt.target.id) {
            case "type" :
                setInsuranceType(evt.target.value);
                break
            case "provider" :
                setInsuranceProvider(evt.target.value);
                break
            case "number" :
                setPolicyNumber(evt.target.value);
                break
            case "state" :
                setState(evt.target.value);
                break
            case "issued" :
                setDateInitial(evt.target.value);
                break
            case "renewed" :
                setDateRenewed(evt.target.value);
                break
            case "expired" :
                setDateExpiring(evt.target.value);
        }
    }
    
    //need a function to dispatch the information
    const submitInsurance = (event, awsKey) => {
        event.preventDefault();
        //set submitted state to true
        setSubmitted(true);
        //create an object that captures the form data
        const insuranceObj = {
            insuranceType: insuranceType,
            insuranceProvider: insuranceProvider,
            policyNumber: policyNumber,
            state: state,
            dateInitial: dateInitial,
            dateRenewed: dateRenewed,
            dateExpiring: dateExpiring,
            insuranceImageKey: awsKey
            //possibly need a pdf upload here
        }
        console.log(insuranceObj);

        dispatch({
            type: 'ADD_INSURANCE_ITEM',
            payload: insuranceObj
        })

        //call on add insurace item to produce another form
        props.addInsuranceItem();

    }

    const imageType = 'insurance'

    return (
        <div className="general-form-display">
            <form onSubmit={submitInsurance}>

            <div className="text-field-wrapper">
            <TextField
                required
                label="Type of Insurance"
                id="type"
                value={insuranceType}
                onChange={handleChange} />
            </div>
            
            <div className="text-field-wrapper">
            <TextField 
                required
                label="Provider"
                id="provider"
                value={insuranceProvider}
                onChange={handleChange}/>
            </div>

            <div className="text-field-wrapper">
            <TextField 
                required
                label="Policy #"
                id="number"
                value={policyNumber}
                onChange={handleChange}/>
            </div>

            <div className="text-field-wrapper">
            <TextField 
                required
                label="State Initials"
                id="state"
                value={state}
                onChange={handleChange}/>
            </div>

            <div className="text-field-wrapper">
            {/* <FormLabel>Date Issued:</FormLabel> */}
            <TextField
                required
                type="date"
                id="issued"
                label="Date Issued"
                InputLabelProps={{ shrink: true }}
                value={dateInitial}
                onChange={handleChange}/>
            </div>

            <div className="text-field-wrapper">
           {/* <FormLabel>Date Renewed:</FormLabel> */}
            <TextField 
                required
                type="date"
                id="renewed"
                label="Date Renewed"
                InputLabelProps={{ shrink: true }}
                value={dateRenewed}
                onChange={handleChange}/>            
            </div>

            <div className="text-field-wrapper">
            {/* <FormLabel>Date Expired:</FormLabel> */}
            <TextField
                required
                type="date"
                id="expired"
                label="Date Expired"
                InputLabelProps={{ shrink: true }}
                value={dateExpiring}
                onChange={handleChange}/>
            </div>

                <ImageUploader imageType={imageType} submitFunction={submitInsurance} />

            {submitted ? (
                <p>Information Submitted!</p>
            ) : (
    
                    <div className="text-field-wrapper">
                        <Button variant="contained" color="secondary" type="submit">Add Insurance Entry+</Button>
                    </div>
            )}
            </form>
        </div>
    )
}

export default InsuranceMultiRow;