import { useState } from "react"
import { TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"

function EducationMultiRow(props) {
    const dispatch = useDispatch();

    const [school, setSchool] = useState('')
    const [degree, setDegree] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)


    function submitEducationHistoryItem(e) {
        e.preventDefault()
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

        props.addEducationHistoryItem()
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
            <form onSubmit={submitEducationHistoryItem}>

            {/* <label htmlFor="schoolInput">School</label> */}
            <TextField required label="School" id="schoolInput" value={school} onChange={handleChange} variant="outlined" />

            {/* <label htmlFor="degreeInput">Job Title</label> */}
            <TextField required label="Degree" id="degreeInput" value={degree} onChange={handleChange} variant="outlined" />

            <label htmlFor="startDateInput">Start Date</label>
            <TextField required type="date" id="startDateInput" value={startDate} onChange={handleChange} />

            <label htmlFor="endDateInput">End Date</label>
            <TextField required type="date" id="endDateInput" value={endDate} onChange={handleChange} />

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (

                <button type="submit" >+</button>
            )}


            </form>
            

        </div>
    )
}

export default EducationMultiRow
