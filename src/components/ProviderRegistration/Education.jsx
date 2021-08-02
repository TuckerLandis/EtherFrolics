import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import EducationMultiRow from "./FormComponents/EducationMultiRow";
import ImageUploader from "../ImageComponents/ImageUploader";

function Education() {

    const dispatch = useDispatch();
    const history = useHistory();

    // state array on which education history sub components are rendered
    const [amountOfEducationHistories, setAmountOfEducationHistories] = useState([1])

    // state variable to track if at least 1 section
    // of education data has been submitted to the DB
    const [educationSubmitted, setEducationSubmitted] = useState(false);

    // increases the amount of education history elements in the array above
    function addEducationHistoryItem() {

        setAmountOfEducationHistories(amountOfEducationHistories =>
            [...amountOfEducationHistories, amountOfEducationHistories.length + 1])

        // education submitted set to true renders next button enabled
        setEducationSubmitted(true);

    }

    function handleNext() {
        // submit last one? some sort of check
        history.push('/medcred')
    }

   

    return (
        <div>
            <p>Education</p>

            {/* maps a state array to render relevant number of education history forms */}
            {amountOfEducationHistories.map(education => {
                return (
                    <EducationMultiRow addEducationHistoryItem={addEducationHistoryItem} />
                )
            })}

            
            

            <button disabled={!educationSubmitted ? true : false} onClick={handleNext}>Next</button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default Education