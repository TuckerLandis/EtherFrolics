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
            <label htmlFor="schoolInput">School</label>
            <TextField id="schoolInput" value={school} onChange={handleChange} />

            <label htmlFor="degreeInput">Job Title</label>
            <TextField id="degreeInput" value={degree} onChange={handleChange} />

            <label htmlFor="startDateInput">Start Date</label>
            <TextField type="date" id="startDateInput" value={startDate} onChange={handleChange} />

            <label htmlFor="endDateInput">End Date</label>
            <TextField type="date" id="endDateInput" value={endDate} onChange={handleChange} />

            {hasBeenSubmitted ? (
                <p>submitted</p>
            ) : (

                <button onClick={submitEducationHistoryItem}>+</button>
            )}

        </div>
    )
}

export default EducationMultiRow
