import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import WorkHistoryMultiRow from './FormComponents/WorkHistoryMultiRow'
import ImageUploader from "../ImageComponents/ImageUploader";
import {Button} from '@material-ui/core'
import { useSelector } from "react-redux";

function WorkHistory() {
    const dispatch = useDispatch();
    const history = useHistory();

    

    const workHistoryItems = useSelector(store => store.workHistoryReducer)

    const [yearsExperience, setYearsExperience] = useState('');

    // state array on which work history sub components are rendered
    const [amountOfWorkHistories, setAmountOfWorkHistories] = useState([1])
    // let keyForWorkHistoryMultiRow = 1

    // state variable to track if at least 1 section
    // of work history data has been submitted to the DB
    const [workHistorySubmitted, setWorkHistorySubmitted] = useState(false);
 
    // state variable to be flipped upon resume submission
    const [resumeSubmitted, setResumeSubmitted] = useState(false)

    // this function is passed down as props to the imageUploader component, so that it can flip this boolean for render usage on this page
    function resumeSubmitFunction () {
        setResumeSubmitted(true)
        console.log('resume submitted');
    }

    // increases the amount of work history elements in the array above
    function addWorkHistoryItem() {

        // keyForWorkHistoryMultiRow++
        setAmountOfWorkHistories(amountOfWorkHistories =>
            [...amountOfWorkHistories, amountOfWorkHistories.length + 1])

        // workHistorySubmitted becoming true enables the next button
        setWorkHistorySubmitted(true);

    }

    function handleChange(e) {
        console.log(e.target.value);
        setYearsExperience(e.target.value)

    }

    async function handleNext() {

        if(yearsExperience === '-') {
            return alert('Please enter years of experience')
        }
        // send dispatch with just years of experience
        await dispatch({
            type: 'PUT_WORK_HISTORY',
            payload: {
                yearsExperience: yearsExperience,
            }
        })

        // send a dispatch to post all work histories
        await dispatch({
            type: 'POST_WORK_HISTORY_ITEMS',
            payload: workHistoryItems
        })

        history.push('/missionhistory')
    }


    // props for imageUploader. only declaring these here for visibility
    const resume = 'resume'
    const dispatchText = 'POST_RESUME'
    const DBdispatchText = 'POST_RESUME_TO_DB'

    return (
        <div>
            <label htmlFor="yearsExperienceInput">Years of experience</label>
            <select name="yearsExperience" id="yearsExperienceInput" onChange={handleChange}>
                <option value="-">-</option>
                <option value="1-2">1-2</option>
                <option value="2-3">2-3</option>
                <option value="3-5">3-5</option>
                <option value="5-10">5-10</option>
                <option value="10-15">10-15</option>
                <option value="15-20">15-20</option>
                <option value="20+">20+</option>
            </select>



            {/* spacers, to be removed */}
            <br></br>
            <br></br>

            <h3>Submit Your Resume</h3>
            {/* takes in props above the return, and the submitResumeFunction */}
            <ImageUploader imageType={resume} dispatchText={dispatchText} DBdispatchText={DBdispatchText} submitFunction={resumeSubmitFunction} imageSubmitted={resumeSubmitted}/>

            <br></br>
            <br></br>

            <h3>Add Work History</h3>
            {/* maps a state array to render relevant number of work history forms */}
            {amountOfWorkHistories.map((history, i )=> {
                return (
                    <WorkHistoryMultiRow key={i} addWorkHistoryItem={addWorkHistoryItem} /> // key={keyForWorkHistoryMultiRow} https://reactjs.org/docs/lists-and-keys.html
                )
            })}

            
            
            
            <Button variant="contained" color="primary" disabled={!workHistorySubmitted ? true : false} onClick={handleNext}> Next </Button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default WorkHistory
