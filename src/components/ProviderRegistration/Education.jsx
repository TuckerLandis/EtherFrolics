import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import EducationMultiRow from "./FormComponents/EducationMultiRow";
import { useSelector } from "react-redux";
import RegistrationStepper from './Stepper'
import { Typography } from "@material-ui/core";

function Education() {

    const dispatch = useDispatch();
    const history = useHistory();

    const educationHistoryItems = useSelector(store => store.educationHistoryReducer)

    // state array on which education history sub components are rendered
    const [amountOfEducationHistories, setAmountOfEducationHistories] = useState([1])

    // increases the amount of education history elements in the array above
    function addEducationHistoryItem() {

        setAmountOfEducationHistories(amountOfEducationHistories =>
            [...amountOfEducationHistories, amountOfEducationHistories.length + 1])

    }

    function handleNext() {
        // submit last one? some sort of check

        dispatch({
            type: 'POST_EDUCATION_HISTORY_ITEMS',
            payload: educationHistoryItems
        })


        history.push('/medcred')
    }

   const activeStep= 4

    return (
        <div>
            <Typography variant="h4" className="registration-title">Education</Typography>
            <hr></hr>

            {/* maps a state array to render relevant number of education history forms */}
            {amountOfEducationHistories.map((education, i )=> {
                return (
                    <EducationMultiRow key={i} addEducationHistoryItem={addEducationHistoryItem} />
                )
            })}

            
            

            {/* <button disabled={!educationSubmitted ? true : false} onClick={handleNext}>Next</button> */}

            {/* stepper goes here with props of which page */}
            <RegistrationStepper activeStep={activeStep} submitFunction={handleNext}/>

        </div>
    )
}


export default Education