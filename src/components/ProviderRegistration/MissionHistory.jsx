import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import MissionHistoryMultiRow from "./FormComponents/MissionHistoryMultiRow"


function MissionHistory () {

    const dispatch = useDispatch();
    const history = useHistory();

    const [amountOfMissionHistories, setAmountOfMissionHistories] = useState([1])

    // increases the amount of education history elements in the array above
    function addMissionHistoryItem() {

        setAmountOfMissionHistories(amountOfMissionHistories =>
            [...amountOfMissionHistories, amountOfMissionHistories.length + 1])

    }



    return(
        <div>
            <label htmlFor="lastMissionInput">When was your last mission trip?</label>
            <select name="lastMission" id="lastMissionInput" >
                <option value="1">Within the last year</option>
                <option value="2">Within the last 2 years</option>
                <option value="3">Within the last 3 years</option>
                <option value="4">Within the last 4 years</option>
                <option value="5">Within the last 5 years</option>
                <option value="6">More than 5 years ago</option>
                </select>

            {/* maps a state array to render relevant number of work history forms */}
            {amountOfMissionHistories.map(education => {
                return (
                    <MissionHistoryMultiRow addMissionHistoryItem={addMissionHistoryItem} />
                )
            })}

<button onClick={handleNext}>Next</button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default MissionHistory




