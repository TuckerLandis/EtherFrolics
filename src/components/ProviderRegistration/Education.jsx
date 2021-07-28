import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import EducationMultiRow from "./FormComponents/EducationMultiRow";

function Education () {

    const dispatch = useDispatch();
    const history = useHistory();

    // state array on which education history sub components are rendered
    const [amountOfEducationHistories, setAmountOfEducationHistories] = useState([1])
  

    // increases the amount of education history elements in the array above
    function addEducationHistoryItem() {

    
        setAmountOfEducationHistories(amountOfEducationHistories =>
            [...amountOfEducationHistories, amountOfEducationHistories.length + 1])

    }

    return(
        <div>
          <p>Education</p>

            {/* maps a state array to render relevant number of work history forms */}
            {amountOfEducationHistories.map(education => {
                return (
                    <EducationMultiRow addEducationHistoryItem={addEducationHistoryItem} /> 
                )
            })}

           {/* next button goes here */}

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default Education