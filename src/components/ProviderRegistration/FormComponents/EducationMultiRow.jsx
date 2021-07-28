import { useState } from "react"
import { TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"

function EducationMultiRow() {

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)


    function submitEducationHistoryItem() {
        setHasBeenSubmitted(true)

        dispatch({
            type: 'ADD_EDUCATION_HISTORY_ITEM',
            payload: {
                school: school,
                degree: degree,
                startDate: startDate,
                endDate: endDate,
            }
        })

        props.addWorkHistoryItem()
    }

    function handleChange(e) {
        switch (e.target.id) {
            case 'schoolInput':
                setSchool(e.target.value)
                break
            case 'degreeInput':
                setDegree(e.target.value)
                break
            case 'startDateInput':
                setStartDate(e.target.value)
                break
            case 'endDateInput':
                setEndDate(e.target.value)
                break

        }
    }

    return (
        <div>
            <label htmlFor="schoolInput">School</label>
            <TextField id="schoolInput" value={school} onChange={handleChange} />

            <label htmlFor="degreeInput">Job Title</label>
            <TextField id="degreeInput" value={degree} onChange={handleChange} />

            <label htmlFor="startDateInput">Start Date</label>
            <TextField type="date" id="startDateInput" value={startDate} onChange={handleChange} />

            <label htmlFor="endDateInput">End Date</label>
            <TextField type="date" id="endDateInput" value={startDate} onChange={handleChange} />

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (

                <button onClick={submitWorkHistoryItem}>+</button>
            )}
        </div>
    )
}

export default EducationMultiRow

// ## Checklist

// - [ ]  Inputs
//     - [ ]  school
//     - [ ]  degree
//     - [ ]  start date
//     - [ ]  end date
//     - [ ]  + button to add another school
//     - [ ]  publications upload, text input for link, button to add a new
// - [ ]  PDF upload degrees/transcripts
// - [ ]  stepper

// - [ ]  next button → credential upload

// ## Components

// - [ ]  education history form component - this contains inputs for education history, gets duplicated by + button
// - [ ]  header, stepper

// - [ ]  pdf upload component - gets passed props from URL params to denote which type of file is uploaded

// ## Routes

// - [ ]  put route to provider table
// - [ ]  post route to education history table
// - [ ]  post to amazon s3 type: education
// - [ ]  put route to provider table - publications array