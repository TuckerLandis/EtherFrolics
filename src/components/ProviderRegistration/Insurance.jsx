import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import InsuranceMultiRow from './FormComponents/InsuranceMultiRow';



function Insurance () {
    const dispatch = useDispatch();
    const history = useHistory();

    // create an array that will render the insurance history subcomponents
    const [amountOfInsuranceHistories, setAmountOfInsuranceHistories] = useState([1]);

    // create a function that will increase the amount of insurance histories
    const addInsuranceItem = () => {
        setAmountOfInsuranceHistories(amountOfInsuranceHistories => {
            [...amountOfInsuranceHistories, amountOfInsuranceHistories.length + 1]
        })
    }

    return(
        <div>
          <p>Insurance</p>

            {amountOfInsuranceHistories.map( () => {
                return (<InsuranceMultiRow addInsuranceItem={addInsuranceItem}/>)
            })}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default Insurance


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