import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import WorkHistoryMultiRow from './FormComponents/WorkHistoryMultiRow'
import ImageUploader from "../ImageComponents/ImageUploader";
import {Button, Select, MenuItem} from '@material-ui/core'
import { useSelector } from "react-redux";
import RegistrationStepper from './Stepper'


function WorkHistory() {
    const dispatch = useDispatch();
    const history = useHistory();

    

    const workHistoryItems = useSelector(store => store.workHistoryReducer)

    const [yearsExperience, setYearsExperience] = useState('-');

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
    // props for stepper
    const activeStep = 2

    return (
        <div>
            <h1 className="registration-title">Work History</h1>
        
            

            <h3>Submit Your Resume</h3>
            {/* takes in props above the return, and the submitResumeFunction */}
            <ImageUploader imageType={resume} dispatchText={dispatchText} DBdispatchText={DBdispatchText} submitFunction={resumeSubmitFunction} imageSubmitted={resumeSubmitted}/>
            <br></br>
            
            <div className="text-field-wrapper">

            <label htmlFor="yearsExperienceInput">Years of experience</label>
            <Select variant="outlined" name="yearsExperience" id="yearsExperienceInput" onChange={handleChange}>
                <MenuItem value="-">-</MenuItem>
                <MenuItem value="1-2">1-2</MenuItem>
                <MenuItem value="2-3">2-3</MenuItem>
                <MenuItem value="3-5">3-5</MenuItem>
                <MenuItem value="5-10">5-10</MenuItem>
                <MenuItem value="10-15">10-15</MenuItem>
                <MenuItem value="15-20">15-20</MenuItem>
                <MenuItem value="20+">20+</MenuItem>
            </Select>

            </div>
            

            <h3 className="registration-title-subheading">Add Work History</h3>
            {/* maps a state array to render relevant number of work history forms */}
            {amountOfWorkHistories.map((history, i )=> {
                return (
                    <WorkHistoryMultiRow key={i} addWorkHistoryItem={addWorkHistoryItem} /> // key={keyForWorkHistoryMultiRow} https://reactjs.org/docs/lists-and-keys.html
                )
            })}

            
            
            
            {/* <Button variant="contained" color="primary" disabled={!workHistorySubmitted ? true : false} onClick={handleNext}> Next </Button> */}
            <div>
                <RegistrationStepper activeStep={activeStep} submitFunction={handleNext} />
            </div>
            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default WorkHistory
