import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import WorkHistoryMultiRow from './FormComponents/WorkHistoryMultiRow'
import ImageUploader from "../ImageComponents/ImageUploader";
import {Button, Select, MenuItem, Typography} from '@material-ui/core'
import { useSelector } from "react-redux";
import RegistrationStepper from './Stepper'


function WorkHistory() {
    const dispatch = useDispatch();
    const history = useHistory();

    // boolean state for if a resume has been submitted, for form validation
    const [resumeSubmitted, setResumeSubmitted] = useState(false)

    // use selector for work history items, this could be used to render upon submit
    const workHistoryItems = useSelector(store => store.workHistoryReducer)

    // state variable for years of experience, default to -, set upon handleNext and for validated
    const [yearsExperience, setYearsExperience] = useState('-');

    // state array on which work history sub components are rendered, 
    //once a subform is submitted, this counts up by one, rendering a new subform
    const [amountOfWorkHistories, setAmountOfWorkHistories] = useState([1])
 
    // increases the amount of work history elements in the array above
    function addWorkHistoryItem() {

        // keyForWorkHistoryMultiRow++
        setAmountOfWorkHistories(amountOfWorkHistories =>
            [...amountOfWorkHistories, amountOfWorkHistories.length + 1])

    }

    // sets years of experience based on select
    function handleChange(e) {
        setYearsExperience(e.target.value)
    }

    // passed down as props to image uploader, to be triggered upon attach button click, see ImageUploader.jsx
    function handleImageAttach(awsKey) {
        setResumeSubmitted(true)
    }

    /**
     * Passed down to stepper, upon pressing next, form validate, then send dispatches as below
     * once dispatches are complete, send user to next page
     * @returns 
     */
    async function handleNext() {

        if(yearsExperience === '-') {
            return alert('Please enter years of experience')
        }

        if (resumeSubmitted === false) {
            return alert('Please attach your resume')
        }

        if (amountOfWorkHistories.length === 1) {
            return alert('Please add at least one work history item')
        }

        // send dispatch with just years of experience
        await dispatch({
            type: 'PUT_WORK_HISTORY',
            payload: {
                yearsExperience: yearsExperience,
            }
        })

        // send a dispatch to post all work histories from the reducer
        await dispatch({
            type: 'POST_WORK_HISTORY_ITEMS',
            payload: workHistoryItems
        })
        
        // send user to next page
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
            <Typography variant="h4" className="registration-title">Work History</Typography>
            
        
            <hr></hr>

            <Typography variant="subtitle1" className="registration-title-subheading">Submit Your Resume</Typography>
            {/* takes in props above the return, and the submitResumeFunction */}
            <ImageUploader imageType={resume} dispatchText={dispatchText} DBdispatchText={DBdispatchText} imageSubmitted={resumeSubmitted} attachImageFunction={handleImageAttach}/>
            <br></br>
            
            <div className="text-field-wrapper">

            <div className="text-field-wrapper">
            <Typography variant="body1" htmlFor="yearsExperienceInput">Years of experience</Typography>
            </div>
            
            <Select variant="outlined" value={yearsExperience} name="yearsExperience" id="yearsExperienceInput" onChange={handleChange}>
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
            

            <Typography variant="h5" className="registration-title-subheading">Add Work History</Typography>
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
