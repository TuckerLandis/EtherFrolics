import { Typography } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import MissionHistoryMultiRow from "./FormComponents/MissionHistoryMultiRow"
import RegistrationStepper from './Stepper'


function MissionHistory () {

    const dispatch = useDispatch();
    const history = useHistory();

    const missionHistoryItems = useSelector(store => store.missionHistoryReducer)

    // state array on which mission history sub components are rendered, 
    // once a subform is submitted, this counts up by one, rendering a new subform
    const [amountOfMissionHistories, setAmountOfMissionHistories] = useState([1])

    // state variable to track if at least 1 section
    // of mission history data has been submitted to the DB, not a required field as of now, this variable doesn't get referenced at this time
    const [missionHistorySubmitted, setMissionHistorySubmitted] = useState(false);

    // increases the amount of mission history elements in the array above
    function addMissionHistoryItem() {

        setAmountOfMissionHistories(amountOfMissionHistories =>
            [...amountOfMissionHistories, amountOfMissionHistories.length + 1])

        // missionHistorySubmitted set to true enables
        // NEXT button to navigate to the next page
        setMissionHistorySubmitted(true);

    }
    
    // passed down as props to <RegistrationStepper />
    function handleNext(e) {
        e.preventDefault
        
         dispatch({
             type: 'POST_MISSION_HISTORY_ITEMS',
             payload: missionHistoryItems

         })
       
        // sends user to next page
        history.push('/education')
    }

    // sent down as props to render progress bar in stepper component
    const activeStep = 3

    return(
        <div>

            <Typography variant="h4" className="registration-title">Mission History</Typography>
            <hr></hr>
 
            {/* maps a state array to render relevant number of work history forms */}
            {amountOfMissionHistories.map((education, i) => {
                return (
                    <MissionHistoryMultiRow key={i} addMissionHistoryItem={addMissionHistoryItem} />
                )
            })}


        
            < RegistrationStepper activeStep={activeStep} submitFunction={handleNext}/>

        </div>
    )
}


export default MissionHistory




