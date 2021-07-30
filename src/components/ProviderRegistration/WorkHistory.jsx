import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import WorkHistoryMultiRow from './FormComponents/WorkHistoryMultiRow'

function WorkHistory() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [yearsExperience, setYearsExperience] = useState('');

    // state array on which work history sub components are rendered
    const [amountOfWorkHistories, setAmountOfWorkHistories] = useState([1])
    // let keyForWorkHistoryMultiRow = 1

    // state variable to track if at least 1 section
    // of work history data has been submitted to the DB
    const [workHistorySubmitted, setWorkHistorySubmitted] = useState(false);

    // increases the amount of work history elements in the array above
    function addWorkHistoryItem() {

        // keyForWorkHistoryMultiRow++
        setAmountOfWorkHistories(amountOfWorkHistories =>
            [...amountOfWorkHistories, amountOfWorkHistories.length + 1])

    }

    function handleChange(e) {
        console.log(e.target.value);
        setYearsExperience(e.target.value)

    }

    function handleNext() {

        if(yearsExperience === 0) {
            return alert('Please enter years of experience')
        }
        // send dispatch with just years of experience, also post resume to s3
        dispatch({
            type: 'PUT_WORK_HISTORY',
            payload: {
                yearsExperience: yearsExperience,
            }
        })
        history.push('/missionhistory')
    }

    return (
        <div>
            <label htmlFor="yearsExperienceInput">Years of experience</label>
            <select name="yearsExperience" id="yearsExperienceInput" onChange={handleChange}>
                <option value="1-2">1-2</option>
                <option value="2-3">2-3</option>
                <option value="3-5">3-5</option>
                <option value="5-10">5-10</option>
                <option value="10-15">10-15</option>
                <option value="15-20">15-20</option>
                <option value="20+">20+</option>
            </select>


            <button>Resume Upload (Dummy) </button>

            {/* spacers, to be removed */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* maps a state array to render relevant number of work history forms */}
            {amountOfWorkHistories.map(history => {
                return (
                    <WorkHistoryMultiRow addWorkHistoryItem={addWorkHistoryItem} setWorkHistorySubmitted={setWorkHistorySubmitted} /> // key={keyForWorkHistoryMultiRow} https://reactjs.org/docs/lists-and-keys.html
                )
            })}



            <button disabled={!workHistorySubmitted ? true : false} onClick={handleNext}> Next </button>

            {/* stepper goes here with props of which page */}

        </div>
    )
}


export default WorkHistory
