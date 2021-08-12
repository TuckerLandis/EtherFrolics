import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import InsuranceMultiRow from './FormComponents/InsuranceMultiRow';
import Button from '@material-ui/core/Button';
import RegistrationStepper from './Stepper'
import { Typography } from '@material-ui/core';


function Insurance () {
    const dispatch = useDispatch();
    const history = useHistory();

    const insuranceItems = useSelector(store => store.insuranceItemReducer)

    // creates an array that will render the insurance history subcomponents
    const [amountOfInsuranceHistories, setAmountOfInsuranceHistories] = useState([1]);

    // state variable to track if at least 1 section
    // of insurance data has been submitted to the DB
    // not referenced as of now
    const [insuranceSubmitted, setInsuranceSubmitted] = useState(false);

    // create a function that will increase the amount of insurance histories
    function addInsuranceItem () {
        setAmountOfInsuranceHistories(amountOfInsuranceHistories => 
            [...amountOfInsuranceHistories, amountOfInsuranceHistories.length + 1]
        )

        // insuranceSubmitted being true enables next button
        setInsuranceSubmitted(true)
    }

    //send user to the next page but it is peer review... so may want to send them elsewhere
    const nextPage = () => {

        dispatch({
            type: 'POST_INSURANCE_ITEMS',
            payload: insuranceItems
        })
        
        dispatch({
            type: 'COMPLETE_REGISTRATION'

        })

        history.push('/providerlandingpage');

    }

    const activeStep = 8

    return(
        <div>
          <Typography className="registration-title" variant="h4">Insurance</Typography>
          <hr></hr>

            {amountOfInsuranceHistories.map( (insurance, i) => {
                return (<InsuranceMultiRow key={i} addInsuranceItem={addInsuranceItem}/>)
            })}

           
            < RegistrationStepper activeStep={activeStep} submitFunction={nextPage}/>
            
        </div>
    )
}


export default Insurance;
